"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeThreadsModule = void 0;
const common_1 = require("@nestjs/common");
const thread_like_service_1 = require("./thread-like.service");
const thread_like_controller_1 = require("./thread-like.controller");
const typeorm_1 = require("@nestjs/typeorm");
const thread_like_entity_1 = require("./entities/thread-like.entity");
const jwtModule_1 = require("../../config/jwtModule");
const thread_entity_1 = require("../thread/entities/thread.entity");
let LikeThreadsModule = class LikeThreadsModule {
};
LikeThreadsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([thread_like_entity_1.LikeThread]),
            jwtModule_1.jwtModule,
            typeorm_1.TypeOrmModule.forFeature([thread_entity_1.Thread]),
        ],
        controllers: [thread_like_controller_1.LikeThreadsController],
        providers: [thread_like_service_1.LikeThreadsService],
    })
], LikeThreadsModule);
exports.LikeThreadsModule = LikeThreadsModule;
//# sourceMappingURL=thread-like.module.js.map