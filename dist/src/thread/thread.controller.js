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
exports.ThreadController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const auth_guard_1 = require("../auth/auth.guard");
const thread_service_1 = require("./thread.service");
const create_thread_dto_1 = require("./dto/create-thread.dto");
const update_thread_dto_1 = require("./dto/update-thread.dto");
let ThreadController = class ThreadController {
    constructor(threadService) {
        this.threadService = threadService;
    }
    async create(req, createThreadDto, files) {
        var _a, _b, _c;
        const data = await this.threadService.create(Object.assign(Object.assign({}, createThreadDto), { image: (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0], audio: (_b = files === null || files === void 0 ? void 0 : files.audio) === null || _b === void 0 ? void 0 : _b[0] }), (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id);
        return {
            statusCode: 201,
            data: {
                id: data.id,
                title: data.title,
                description: data.description,
                topic: data.topic,
                image: data.image,
                audio: data.audio,
                audio_length: Number(data.audio_length),
                created_at: data.created_at,
            },
        };
    }
    async findAll(page, size) {
        if (!page)
            page = '0';
        if (!page)
            size = '5';
        return {
            statusCode: 200,
            data: await this.threadService.findAll(page, size),
        };
    }
    async findOne(id) {
        return {
            statusCode: 200,
            data: await this.threadService.findOneById(+id),
        };
    }
    async update(id, updateThreadDto, req, files) {
        var _a, _b, _c;
        const data = await this.threadService.update(+id, Object.assign(Object.assign({}, updateThreadDto), { image: (_a = files === null || files === void 0 ? void 0 : files.image) === null || _a === void 0 ? void 0 : _a[0], audio: (_b = files === null || files === void 0 ? void 0 : files.audio) === null || _b === void 0 ? void 0 : _b[0] }), (_c = req === null || req === void 0 ? void 0 : req.user) === null || _c === void 0 ? void 0 : _c.id);
        return {
            statusCode: 200,
            data: {
                id: data.id,
                title: data.title,
                description: data.description,
                topic: data.topic,
                image: data.image,
                audio: data.audio,
                audio_length: data.audio ? Number(data.audio_length) : undefined,
                created_at: data.created_at,
            },
        };
    }
    async remove(id, req) {
        var _a;
        await this.threadService.remove(+id, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image' }, { name: 'audio' }])),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_thread_dto_1.CreateThreadDto, Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('size')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileFieldsInterceptor)([{ name: 'image' }, { name: 'audio' }])),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __param(2, (0, common_1.Request)()),
    __param(3, (0, common_1.UploadedFiles)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_thread_dto_1.UpdateThreadDto, Object, Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "update", null);
__decorate([
    (0, common_1.HttpCode)(204),
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ThreadController.prototype, "remove", null);
ThreadController = __decorate([
    (0, common_1.Controller)('threads'),
    __metadata("design:paramtypes", [thread_service_1.ThreadService])
], ThreadController);
exports.ThreadController = ThreadController;
//# sourceMappingURL=thread.controller.js.map