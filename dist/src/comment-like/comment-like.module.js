"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentLikeModule = void 0;
const common_1 = require("@nestjs/common");
const comment_like_service_1 = require("./comment-like.service");
const comment_like_controller_1 = require("./comment-like.controller");
const comment_entity_1 = require("../comment/entities/comment.entity");
const comment_like_entity_1 = require("./entities/comment-like.entity");
const typeorm_1 = require("@nestjs/typeorm");
const thread_entity_1 = require("../thread/entities/thread.entity");
const jwtModule_1 = require("../../config/jwtModule");
let CommentLikeModule = class CommentLikeModule {
};
CommentLikeModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                comment_like_entity_1.LikeComment,
                comment_entity_1.Comment,
                thread_entity_1.Thread,
            ]),
            jwtModule_1.jwtModule
        ],
        providers: [comment_like_service_1.LikeCommentsService],
        controllers: [comment_like_controller_1.CommentLikeController]
    })
], CommentLikeModule);
exports.CommentLikeModule = CommentLikeModule;
//# sourceMappingURL=comment-like.module.js.map