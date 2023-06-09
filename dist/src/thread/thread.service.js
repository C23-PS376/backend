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
exports.ThreadService = void 0;
const common_1 = require("@nestjs/common");
const thread_entity_1 = require("./entities/thread.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const storage_service_1 = require("../storage/storage.service");
const get_audio_duration_1 = require("get-audio-duration");
const fs = require("fs");
const tmp = require("tmp");
const topics_service_1 = require("../topics/topics.service");
const user_service_1 = require("../user/user.service");
const user_entity_1 = require("../user/entities/user.entity");
const axios_1 = require("@nestjs/axios");
const config_1 = require("@nestjs/config");
let ThreadService = class ThreadService {
    constructor(threadRepository, userRepository, storageService, topicService, userService, httpService, configService) {
        this.threadRepository = threadRepository;
        this.userRepository = userRepository;
        this.storageService = storageService;
        this.topicService = topicService;
        this.userService = userService;
        this.httpService = httpService;
        this.configService = configService;
    }
    async create(createUserDto, userId) {
        const thread = new thread_entity_1.Thread();
        const { audio, image, topic } = createUserDto, createdData = __rest(createUserDto, ["audio", "image", "topic"]);
        if (Number.isNaN(+topic) || !await this.topicService.findOne(+topic))
            throw new common_1.HttpException("Topic doesn't exists", 400);
        const newImagePath = image
            ? await this.storageService.save('threads/image-', image)
            : undefined;
        const newAudioPath = audio
            ? await this.storageService.save('threads/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(thread, Object.assign({ topic, user: userId, image: newImagePath, audio: newAudioPath, audio_length: newAudioLength }, createdData));
        const user = await this.userService.findOneById(+userId);
        user.threads_count = (+user.threads_count + 1).toString();
        await this.userRepository.save(user);
        return await this.threadRepository.save(thread);
    }
    async findAll(page, size, keyword, topic) {
        const query = [];
        if (topic && (Number.isNaN(+topic) || !await this.topicService.findOne(+topic)))
            throw new common_1.HttpException("Topic doesn't exists", 400);
        if (keyword)
            query.push({ title: (0, typeorm_1.ILike)(`%${keyword}%`) }, { description: (0, typeorm_1.ILike)(`%${keyword}%`) });
        if (topic && keyword)
            query.forEach((it) => it.topic = { id: topic });
        if (topic && !keyword)
            query.push({ topic: { id: topic } });
        return await this.threadRepository
            .find({
            where: query,
            order: {
                created_at: 'DESC'
            },
            skip: +page,
            take: +size,
            relations: {
                user: true,
                topic: true,
            },
            select: {
                user: {
                    name: true,
                    image: true
                }
            }
        });
    }
    async findOneById(id) {
        const thread = await this.threadRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
            select: {
                user: {
                    name: true,
                    image: true
                }
            }
        });
        if (!thread)
            throw new common_1.HttpException("Thread doesn't exists", 400);
        return thread;
    }
    async update(threadId, updateThreadDto, userId) {
        var _a;
        const existingThread = await this.threadRepository.findOne({
            where: { id: threadId },
            relations: {
                user: true,
            },
        });
        if (!existingThread)
            throw new common_1.HttpException("Thread doesn't exists", 400);
        if (((_a = existingThread === null || existingThread === void 0 ? void 0 : existingThread.user) === null || _a === void 0 ? void 0 : _a.id) !== userId)
            throw new common_1.ForbiddenException();
        const { audio, image } = updateThreadDto, updatedData = __rest(updateThreadDto, ["audio", "image"]);
        if (updateThreadDto.topic && (Number.isNaN(+updateThreadDto.topic) || !await this.topicService.findOne(+updateThreadDto.topic)))
            throw new common_1.HttpException("Topic doesn't exists", 400);
        const oldImagePath = this.storageService.getFilenameFromPath(existingThread === null || existingThread === void 0 ? void 0 : existingThread.image);
        const oldAudioPath = this.storageService.getFilenameFromPath(existingThread === null || existingThread === void 0 ? void 0 : existingThread.audio);
        const newImagePath = image
            ? await this.storageService.save('threads/image-', image)
            : undefined;
        const newAudioPath = audio
            ? await this.storageService.save('threads/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(existingThread, Object.assign({ image: newImagePath, audio: newAudioPath, audio_length: newAudioLength }, updatedData));
        if (image)
            this.storageService.removeFileIfExists(oldImagePath);
        if (audio)
            this.storageService.removeFileIfExists(oldAudioPath);
        return await this.threadRepository.save(existingThread);
    }
    async remove(id, userId) {
        var _a;
        const existingThread = await this.threadRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });
        if (!existingThread)
            throw new common_1.HttpException("Thread doesn't exists", 400);
        if (((_a = existingThread === null || existingThread === void 0 ? void 0 : existingThread.user) === null || _a === void 0 ? void 0 : _a.id) !== userId)
            throw new common_1.ForbiddenException();
        const oldImagePath = this.storageService.getFilenameFromPath(existingThread === null || existingThread === void 0 ? void 0 : existingThread.image);
        const oldAudioPath = this.storageService.getFilenameFromPath(existingThread === null || existingThread === void 0 ? void 0 : existingThread.audio);
        this.storageService.removeFileIfExists(oldImagePath);
        this.storageService.removeFileIfExists(oldAudioPath);
        const user = await this.userService.findOneById(+userId);
        user.threads_count = (+user.threads_count - 1).toString();
        await this.userRepository.save(user);
        return this.threadRepository.delete({ id });
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
        const url = this.configService.get('ML_API_URL');
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
ThreadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(thread_entity_1.Thread)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        storage_service_1.StorageService,
        topics_service_1.TopicsService,
        user_service_1.UserService,
        axios_1.HttpService,
        config_1.ConfigService])
], ThreadService);
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map