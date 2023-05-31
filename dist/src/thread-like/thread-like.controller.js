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
exports.LikeThreadsController = void 0;
const common_1 = require("@nestjs/common");
const thread_like_service_1 = require("./thread-like.service");
const auth_guard_1 = require("../auth/auth.guard");
let LikeThreadsController = class LikeThreadsController {
    constructor(likeThreadsService) {
        this.likeThreadsService = likeThreadsService;
    }
    async create(req, id) {
        var _a;
        return {
            statusCode: 201,
            data: {
                thread_id: (await this.likeThreadsService.create(+id, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id))
                    .thread,
            },
        };
    }
    async remove(req, id) {
        var _a;
        await this.likeThreadsService.remove(+id, (_a = req === null || req === void 0 ? void 0 : req.user) === null || _a === void 0 ? void 0 : _a.id);
    }
};
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LikeThreadsController.prototype, "create", null);
__decorate([
    (0, common_1.Delete)(),
    (0, common_1.HttpCode)(204),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], LikeThreadsController.prototype, "remove", null);
LikeThreadsController = __decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Controller)('threads/:id/likes'),
    __metadata("design:paramtypes", [thread_like_service_1.LikeThreadsService])
], LikeThreadsController);
exports.LikeThreadsController = LikeThreadsController;
//# sourceMappingURL=thread-like.controller.js.map