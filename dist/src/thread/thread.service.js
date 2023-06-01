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
let ThreadService = class ThreadService {
    constructor(threadRepository, storageService) {
        this.threadRepository = threadRepository;
        this.storageService = storageService;
    }
    async create(createUserDto, userId) {
        const thread = new thread_entity_1.Thread();
        const { audio, image } = createUserDto, createdData = __rest(createUserDto, ["audio", "image"]);
        const newImagePath = image
            ? await this.storageService.save('threads/image-', image)
            : undefined;
        const newAudioPath = audio
            ? await this.storageService.save('threads/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(thread, Object.assign({ user: userId, image: newImagePath, audio: newAudioPath, audio_length: newAudioLength }, createdData));
        return await this.threadRepository.save(thread);
    }
    async findAll(page, size, keyword, topic) {
        const query = [];
        if (keyword)
            query.push({ title: (0, typeorm_1.ILike)(`%${keyword}%`) }, { description: (0, typeorm_1.ILike)(`%${keyword}%`) });
        if (topic && keyword)
            query.forEach((it) => it.topic = topic);
        if (topic && !keyword)
            query.push({ topic });
        return await this.threadRepository
            .find({
            where: query,
            order: {
                created_at: 'DESC'
            },
            skip: +page,
            take: +size
        });
    }
    async findOneById(id) {
        const thread = await this.threadRepository.findOneBy({ id });
        if (!thread)
            throw new common_1.HttpException("Thread didn't exists", 400);
        return thread;
    }
    async update(threadId, updateThreadDto, userId) {
        const existingThread = await this.threadRepository.findOne({
            where: { id: threadId },
            relations: {
                user: true,
            },
        });
        if (!existingThread)
            throw new common_1.HttpException("Thread didn't exists", 400);
        if (existingThread.user.id !== userId)
            throw new common_1.ForbiddenException();
        const { audio, image } = updateThreadDto, updatedData = __rest(updateThreadDto, ["audio", "image"]);
        const oldImagePath = this.storageService.getFilenameFromPath(existingThread.image);
        const oldAudioPath = this.storageService.getFilenameFromPath(existingThread.audio);
        const newImagePath = image
            ? await this.storageService.save('threads/image-', image)
            : undefined;
        const newAudioPath = audio
            ? await this.storageService.save('threads/audio-', audio)
            : undefined;
        const newAudioLength = audio
            ? await this.getAudioDuration(audio.buffer)
            : undefined;
        Object.assign(existingThread, Object.assign({ user: userId, image: newImagePath, audio: newAudioPath, audio_length: newAudioLength }, updatedData));
        if (image)
            this.storageService.removeFileIfExists(oldImagePath);
        if (audio)
            this.storageService.removeFileIfExists(oldAudioPath);
        return await this.threadRepository.save(existingThread);
    }
    async remove(id, userId) {
        const existingThread = await this.threadRepository.findOne({
            where: { id },
            relations: {
                user: true,
            },
        });
        if (!existingThread)
            throw new common_1.HttpException("Thread didn't exists", 400);
        if (existingThread.user.id !== userId)
            throw new common_1.ForbiddenException();
        const oldImagePath = this.storageService.getFilenameFromPath(existingThread.image);
        const oldAudioPath = this.storageService.getFilenameFromPath(existingThread.audio);
        this.storageService.removeFileIfExists(oldImagePath);
        this.storageService.removeFileIfExists(oldAudioPath);
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
};
ThreadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(thread_entity_1.Thread)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        storage_service_1.StorageService])
], ThreadService);
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map