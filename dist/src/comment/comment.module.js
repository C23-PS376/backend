"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentModule = void 0;
const common_1 = require("@nestjs/common");
const comment_controller_1 = require("./comment.controller");
const comment_service_1 = require("./comment.service");
const comment_entity_1 = require("./entities/comment.entity");
const typeorm_1 = require("@nestjs/typeorm");
const multer_config_1 = require("../../config/multer.config");
const storage_service_1 = require("../storage/storage.service");
const jwtModule_1 = require("../../config/jwtModule");
const thread_service_1 = require("../thread/thread.service");
const thread_entity_1 = require("../thread/entities/thread.entity");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([comment_entity_1.Comment, thread_entity_1.Thread]), jwtModule_1.jwtModule, multer_config_1.multerModule],
        controllers: [comment_controller_1.CommentController],
        providers: [comment_service_1.CommentService, storage_service_1.StorageService, thread_service_1.ThreadService],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map