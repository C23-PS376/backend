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
exports.CommentUserController = exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const auth_guard_1 = require("../auth/auth.guard");
const platform_express_1 = require("@nestjs/platform-express");
const create_comment_dto_1 = require("./dto/create-comment.dto");
const thread_service_1 = require("../thread/thread.service");
const update_comment_dto_1 = require("./dto/update-comment.dto");
let CommentController = class CommentController {
    constructor(commentService, threadService) {
        this.commentService = commentService;
        this.threadService = threadService;
    }
    async create(req, threadId, createCommentDto, files) {
        var _a, _b;
        const flaggedWords = await this.commentService.checkToxic(createCommentDto.text);
        if (flaggedWords.length > 0) {
            const message = `Text contains words that are ${flaggedWords.join(', ')}`;
            throw new common_1.BadRequestException({
                statusCode: 400,
                message
            });
        }
        const comment = await this.commentService.create(Object.assign(Object.assign({}, createCommentDto), { audio: (_a = files === null || files === void 0 ? void 0 : files.audio) === null || _a === void 0 ? void 0 : _a[0] }), (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id, threadId);
        return {
            statusCode: 201,
            data: {
                id: comment.id,
                threadId: +comment.thread,
                text: comment.text,
                audio: comment.audio,
                audio_length: Number(comment.audio_length),
                created_at: comment.created_at,
            },
        };
    }
    async update(req, threadId, id, updateCommentDto, files) {
        var _a, _b;
        const flaggedWords = await this.commentService.checkToxic(updateCommentDto.text);
        if (flaggedWords.length > 0) {
            const message = `Text contains flagged words ${flaggedWords.join(', ')}`;
            throw new common_1.BadRequestException({
                statusCode: 400,
                message
            });
        }
        const data = await this.commentService.update(+id, +threadId, Object.assign(Object.assign({}, updateCommentDto), { audio: (_a = files === null || files === void 0 ? void 0 : files.audio) === null || _a === void 0 ? void 0 : _a[0] }), (_b = req === null || req === void 0 ? void 0 : req.user) === null || _b === void 0 ? void 0 : _b.id);
        return {
            statusCode: 200,
            data: {
                id: data.id,
                text: data.text,
                audio: data.audio,
                audio_length: data.audio ? Number(data.audio_length) : undefined,
                updated_at: data.updated_at,
            },
        };
    }
    async findAll(threadId, page, size) {
        if (!page)
            page = '0';
        if (!size)
            size = '5';
        return {
            statusCode: 200,
            data: await this.commentService.findAll(+threadId, +size, +page),
        };
    }
    async findOne(id, threadId) {
        return {
            statusCode: 200,
            data: await this.commentService.findOneById(+id, +threadId),
        };
    }
    async remove(id, threadId, req) {
        var _a;
        await this.commentService.remove(+id, +threadId, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    }
    async toxic(req, text) {
        return await this.commentService.checkToxic(text.text);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'audio' }])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Body)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, create_comment_dto_1.CreateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'audio' }])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Param)('id')),
    __param(3, (0, common_1.Body)()),
    __param(4, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String, update_comment_dto_1.UpdateCommentDto, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "update", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Param)('threadId')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('threadId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "findOne", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('threadId')),
    __param(2, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, Object]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('test'),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_comment_dto_1.CreateCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "toxic", null);
CommentController = __decorate([
    (0, common_1.Controller)('threads/:threadId/comments'),
    __metadata("design:paramtypes", [comment_service_1.CommentService,
        thread_service_1.ThreadService])
], CommentController);
exports.CommentController = CommentController;
let CommentUserController = class CommentUserController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async findAllByUser(userId, page, size) {
        if (!page)
            page = '0';
        if (!size)
            size = '5';
        return {
            statusCode: 200,
            data: await this.commentService.findAllByUserId(+userId, +size, +page),
        };
    }
};
__decorate([
    (0, common_1.Get)(':id/comments'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Query)('page')),
    __param(2, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], CommentUserController.prototype, "findAllByUser", null);
CommentUserController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentUserController);
exports.CommentUserController = CommentUserController;
//# sourceMappingURL=comment.controller.js.map