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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadService = void 0;
const common_1 = require("@nestjs/common");
const thread_entity_1 = require("./entities/thread.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const fs = require("fs");
const config_1 = require("@nestjs/config");
let ThreadService = class ThreadService {
    constructor(threadRepository, configService) {
        this.threadRepository = threadRepository;
        this.configService = configService;
    }
    async create(createUserDto, userId) {
        const thread = new thread_entity_1.Thread();
        Object.assign(thread, Object.assign({ user: userId }, createUserDto));
        return await this.threadRepository.save(thread);
    }
    async findAll() {
        return await this.threadRepository.find();
    }
    async findOneById(id) {
        const thread = await this.threadRepository.findOneBy({ id });
        console.log(thread);
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
        Object.assign(existingThread, Object.assign({ user: userId }, updateThreadDto));
        this.removeFileIfExists(`${this.configService.get('STORAGE')}/${existingThread.audio}`);
        this.removeFileIfExists(`${this.configService.get('STORAGE')}/${existingThread.image}`);
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
        this.removeFileIfExists(`${this.configService.get('STORAGE')}/${existingThread.audio}`);
        this.removeFileIfExists(`${this.configService.get('STORAGE')}/${existingThread.image}`);
        return this.threadRepository.delete({ id });
    }
    removeFileIfExists(path) {
        return new Promise((resolve, reject) => {
            if (fs.existsSync(path)) {
                fs.unlink(path, (err) => {
                    if (err)
                        reject(err);
                    resolve(path);
                });
            }
        });
    }
};
ThreadService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(thread_entity_1.Thread)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService])
], ThreadService);
exports.ThreadService = ThreadService;
//# sourceMappingURL=thread.service.js.map