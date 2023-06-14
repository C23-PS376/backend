"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const storage_service_1 = require("../storage/storage.service");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
const user_service_1 = require("../user/user.service");
const thread_service_1 = require("../thread/thread.service");
const fs = require("fs");
const tmp = require("tmp");
const get_audio_duration_1 = require("get-audio-duration");
const thread_entity_1 = require("../thread/entities/thread.entity");
const user_entity_1 = require("../user/entities/user.entity");
const axios_1 = require("@nestjs/axios");
let CommentService = class CommentService {
    constructor(commentRepository, threadRepository, userRepository, userService, threadService, storageService, httpService) {
        this.commentRepository = commentRepository;
        this.threadRepository = threadRepository;
        this.userRepository = userRepository;
        this.userService = userService;
        this.threadService = threadService;
        this.storageService = storageService;
        this.httpService = httpService;
    }
    async create(createCommentDto, userId, threadId) {
        const existUser = await this.userService.findOneById(+userId);
        const existThread = await this.threadService.findOneById(+threadId);
        existUser.comments_count = (+existUser.comments_count + 1).toString();
        existThread.comments_count = (+existThread.comments_count + 1).toString();
        if (!existThread)
            throw new common_1.HttpException("Thread doesn't exists", 400);
        if (!existUser)
            throw new common_1.HttpException("User doesn't exists", 400);
        const comment = new comment_entity_1.Comment();
        const { audio } = createCommentDto, createdData = __rest(createCommentDto, ["audio"]);
        const newAudioPath = audio
            ? await this.storageService.save('comments/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(comment, Object.assign({ user: userId, thread: threadId, audio: newAudioPath, audio_length: newAudioLength }, createdData));
        await this.userRepository.save(existUser);
        await this.threadRepository.save(existThread);
        return await this.commentRepository.save(comment);
    }
    async update(commentId, threadId, updateCommentDto, userId) {
        const existingComment = await this.commentRepository.findOne({
            where: {
                id: commentId,
                thread: { id: threadId },
            },
            relations: {
                user: true,
                thread: true,
            },
        });
        if (!existingComment)
            throw new common_1.HttpException("Comment didn't exists", 400);
        if (existingComment.user.id !== userId && existingComment.thread.id !== threadId)
            throw new common_1.ForbiddenException();
        const { audio } = updateCommentDto, updatedData = __rest(updateCommentDto, ["audio"]);
        const oldAudioPath = this.storageService.getFilenameFromPath(existingComment.audio);
        const newAudioPath = audio
            ? await this.storageService.save('comments/audio-', audio)
            : undefined;
        Object.assign(existingComment, Object.assign({ user: userId, thread: threadId, audio: newAudioPath }, updatedData));
        if (audio)
            this.storageService.removeFileIfExists(oldAudioPath);
        return await this.commentRepository.save(existingComment);
    }
    async remove(id, threadId, userId) {
        const existingComment = await this.commentRepository.findOne({
            where: {
                id,
                thread: { id: threadId },
            },
            relations: {
                user: true,
            },
        });
        if (!existingComment)
            throw new common_1.HttpException("Comment didn't exists", 400);
        if (existingComment.user.id !== userId)
            throw new common_1.ForbiddenException();
        const oldAudioPath = this.storageService.getFilenameFromPath(existingComment.audio);
        this.storageService.removeFileIfExists(oldAudioPath);
        return this.commentRepository.delete({ id });
    }
    async findOneById(commentId, threadId) {
        const comment = await this.commentRepository.findOne({
            where: {
                id: +commentId,
                thread: { id: threadId },
            },
            select: {
                user: {
                    name: true,
                },
                thread: {
                    id: true,
                }
            }
        });
        if (!comment)
            throw new common_1.HttpException("Comment doesn't exists", 400);
        return comment;
    }
    async findAll(threadId, size, page) {
        const comments = await this.commentRepository.find({
            where: {
                thread: { id: threadId }
            },
            order: {
                created_at: 'DESC'
            },
            skip: page,
            take: size,
            relations: [
                'user',
            ]
        });
        const data = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            audio: comment.audio,
            audio_length: +comment.audio_length,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            username: comment.user.name,
        }));
        return data;
    }
    async findAllByUserId(userId, size, page) {
        const comments = await this.commentRepository.find({
            where: {
                user: { id: userId }
            },
            order: {
                created_at: 'DESC'
            },
            skip: page,
            take: size,
            relations: [
                'user',
                'thread'
            ]
        });
        const data = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            audio: comment.audio,
            audio_length: +comment.audio_length,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            thread_id: comment.thread.id,
        }));
        return data;
    }
    getAudioDuration(audioBuffer) {
        return new Promise((resolve, reject) => {
            tmp.file(function (err, path, fd, cleanup) {
                if (err)
                    throw err;
                fs.appendFile(path, audioBuffer, function (err) {
                    if (err)
                        reject(err);
                    (0, get_audio_duration_1.default)(path).then((duration) => {
                        cleanup();
                        resolve(duration);
                    });
                });
            });
        });
    }
    async checkToxic(text) {
        const url = 'http://127.0.0.1:8081/predict_text';
        const payload = JSON.stringify({ text });
        const config = {
            headers: { 'Content-Type': 'application/json' },
        };
        try {
            const response = await this.httpService.post(url, payload, config).toPromise();
            const flaggedWords = response.data;
            let flaggedTrueWords = [];
            flaggedTrueWords = Object.keys(flaggedWords)
                .filter(key => flaggedWords[key] === true);
            return flaggedTrueWords;
        }
        catch (error) {
            console.error(error);
        }
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __param(2, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        thread_service_1.ThreadService,
        storage_service_1.StorageService,
        axios_1.HttpService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map