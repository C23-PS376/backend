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
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const topics_service_1 = require("../topics/topics.service");
const topic_entity_1 = require("../topics/entities/topic.entity");
const badge_service_1 = require("../badge/badge.service");
const badge_entity_1 = require("../badge/entities/badge.entity");
const axios_1 = require("@nestjs/axios");
let CommentModule = class CommentModule {
};
CommentModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                comment_entity_1.Comment,
                thread_entity_1.Thread,
                topic_entity_1.Topic,
                user_entity_1.User,
                badge_entity_1.Badge,
            ]),
            jwtModule_1.jwtModule,
            multer_config_1.multerModule,
            axios_1.HttpModule,
        ],
        controllers: [comment_controller_1.CommentController],
        providers: [
            comment_service_1.CommentService,
            storage_service_1.StorageService,
            topics_service_1.TopicsService,
            thread_service_1.ThreadService,
            user_service_1.UserService,
            badge_service_1.BadgeService,
        ],
    })
], CommentModule);
exports.CommentModule = CommentModule;
//# sourceMappingURL=comment.module.js.map