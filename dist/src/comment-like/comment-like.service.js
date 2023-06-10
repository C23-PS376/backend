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
exports.LikeCommentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const comment_like_entity_1 = require("./entities/comment-like.entity");
const comment_entity_1 = require("../comment/entities/comment.entity");
const thread_entity_1 = require("../thread/entities/thread.entity");
let LikeCommentsService = class LikeCommentsService {
    constructor(likeCommentsRepository, commentRepository, threadRepository) {
        this.likeCommentsRepository = likeCommentsRepository;
        this.commentRepository = commentRepository;
        this.threadRepository = threadRepository;
    }
    async create(commentId, threadId, userId) {
        const comment = await this.commentRepository.findOneBy({
            id: +commentId,
            thread: { id: +threadId }
        });
        if (!comment)
            throw new common_1.HttpException("Comment didn't exists", 400);
        if (await this.likeCommentsRepository.findOneBy({
            comment: { id: commentId },
            user: { id: userId },
        }))
            throw new common_1.HttpException('Already liked', 400);
        comment.likes_count = (+comment.likes_count + 1).toString();
        const likeComment = new comment_like_entity_1.LikeComment();
        Object.assign(likeComment, {
            user: userId,
            comment: +commentId
        });
        await this.commentRepository.save(comment);
        return this.likeCommentsRepository.save(likeComment);
    }
};
LikeCommentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_like_entity_1.LikeComment)),
    __param(1, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __param(2, (0, typeorm_1.InjectRepository)(thread_entity_1.Thread)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], LikeCommentsService);
exports.LikeCommentsService = LikeCommentsService;
//# sourceMappingURL=comment-like.service.js.map