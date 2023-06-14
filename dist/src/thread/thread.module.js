"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThreadModule = void 0;
const common_1 = require("@nestjs/common");
const thread_service_1 = require("./thread.service");
const thread_controller_1 = require("./thread.controller");
const jwtModule_1 = require("../../config/jwtModule");
const thread_entity_1 = require("./entities/thread.entity");
const typeorm_1 = require("@nestjs/typeorm");
const multer_config_1 = require("../../config/multer.config");
const storage_service_1 = require("../storage/storage.service");
const topics_service_1 = require("../topics/topics.service");
const topic_entity_1 = require("../topics/entities/topic.entity");
const user_entity_1 = require("../user/entities/user.entity");
const user_service_1 = require("../user/user.service");
const badge_service_1 = require("../badge/badge.service");
const badge_entity_1 = require("../badge/entities/badge.entity");
const axios_1 = require("@nestjs/axios");
let ThreadModule = class ThreadModule {
};
ThreadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([thread_entity_1.Thread, topic_entity_1.Topic, user_entity_1.User, badge_entity_1.Badge]), jwtModule_1.jwtModule, multer_config_1.multerModule, axios_1.HttpModule],
        controllers: [thread_controller_1.ThreadController],
        providers: [thread_service_1.ThreadService, storage_service_1.StorageService, topics_service_1.TopicsService, user_service_1.UserService, badge_service_1.BadgeService],
    })
], ThreadModule);
exports.ThreadModule = ThreadModule;
//# sourceMappingURL=thread.module.js.map