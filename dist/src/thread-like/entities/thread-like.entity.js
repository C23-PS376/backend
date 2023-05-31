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
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikeThread = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../user/entities/user.entity");
const thread_entity_1 = require("../../thread/entities/thread.entity");
let LikeThread = class LikeThread {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], LikeThread.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], LikeThread.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => thread_entity_1.Thread, (thread) => thread.id),
    __metadata("design:type", thread_entity_1.Thread)
], LikeThread.prototype, "thread", void 0);
LikeThread = __decorate([
    (0, typeorm_1.Entity)('like-threads')
], LikeThread);
exports.LikeThread = LikeThread;
//# sourceMappingURL=thread-like.entity.js.map