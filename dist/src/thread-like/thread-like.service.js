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
exports.LikeThreadsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const thread_like_entity_1 = require("./entities/thread-like.entity");
const typeorm_2 = require("typeorm");
const thread_entity_1 = require("../thread/entities/thread.entity");
let LikeThreadsService = class LikeThreadsService {
    constructor(likeThreadsRepository, threadRepository) {
        this.likeThreadsRepository = likeThreadsRepository;
        this.threadRepository = threadRepository;
    }
    async create(threadId, userId) {
        if (!await this.threadRepository.findOneBy({ id: +threadId }))
            throw new common_1.HttpException("Thread didn't exists", 400);
        if (await this.likeThreadsRepository.findOneBy({ thread: { id: threadId }, user: { id: userId } }))
            throw new common_1.HttpException("Already liked", 400);
        const likeThread = new thread_like_entity_1.LikeThread();
        Object.assign(likeThread, { user: userId, thread: +threadId });
        return await this.likeThreadsRepository.save(likeThread);
    }
    async remove(threadId, userId) {
        if (!await this.threadRepository.findOneBy({ id: +threadId }))
            throw new common_1.HttpException("Thread didn't exists", 400);
        if (!await this.likeThreadsRepository.findOneBy({ thread: { id: threadId }, user: { id: userId } }))
            throw new common_1.HttpException("Not liked yet", 400);
        return await this.likeThreadsRepository.delete({ thread: { id: threadId }, user: { id: userId } });
    }
};
LikeThreadsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(thread_like_entity_1.LikeThread)),
    __param(1, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], LikeThreadsService);
exports.LikeThreadsService = LikeThreadsService;
//# sourceMappingURL=thread-like.service.js.map