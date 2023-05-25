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
const diskStorage_1 = require("../../config/diskStorage");
let ThreadModule = class ThreadModule {
};
ThreadModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([thread_entity_1.Thread]), jwtModule_1.jwtModule, diskStorage_1.threadMulterModule],
        controllers: [thread_controller_1.ThreadController],
        providers: [thread_service_1.ThreadService],
    })
], ThreadModule);
exports.ThreadModule = ThreadModule;
//# sourceMappingURL=thread.module.js.map