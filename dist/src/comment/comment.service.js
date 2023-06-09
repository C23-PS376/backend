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
const user_entity_1 = require("../user/entities/user.entity");
const thread_entity_1 = require("../thread/entities/thread.entity");
const user_service_1 = require("../user/user.service");
const thread_service_1 = require("../thread/thread.service");
const fs = require("fs");
const tmp = require("tmp");
const get_audio_duration_1 = require("get-audio-duration");
let CommentService = class CommentService {
    constructor(commentRepository, userRepository, threadRepository, userService, threadService, storageService) {
        this.commentRepository = commentRepository;
        this.userRepository = userRepository;
        this.threadRepository = threadRepository;
        this.userService = userService;
        this.threadService = threadService;
        this.storageService = storageService;
    }
    async create(createCommentDto, userId, threadId) {
        const comment = new comment_entity_1.Comment();
        const { audio } = createCommentDto, createdData = __rest(createCommentDto, ["audio"]);
        if (!this.threadService.findOneById(+threadId))
            throw new common_1.HttpException("Thread doesn't exists", 400);
        const newAudioPath = audio
            ? await this.storageService.save('comments/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(comment, Object.assign({ user: userId, thread: threadId, audio: newAudioPath, audio_length: newAudioLength }, createdData));
        const user = await this.userService.findOneById(+userId);
        const thread = await this.threadService.findOneById(+threadId);
        user.comments_count = (+user.threads_count + 1).toString();
        thread.comments_count = (+thread.comments_count + 1).toString();
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
    async findAll(threadId, size) {
        const comments = await this.commentRepository.find({
            where: {
                thread: { id: threadId }
            },
            order: {
                created_at: 'DESC'
            },
            take: size,
            relations: [
                'user'
            ]
        });
        const data = comments.map(comment => ({
            id: comment.id,
            text: comment.text,
            audio: comment.audio,
            audio_length: comment.audio_length,
            created_at: comment.created_at,
            updated_at: comment.updated_at,
            user: {
                name: comment.user.name,
            },
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
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(1, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __param(2, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        user_service_1.UserService,
        thread_service_1.ThreadService,
        storage_service_1.StorageService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map