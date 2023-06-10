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
exports.Comment = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../../../src/user/entities/user.entity");
const thread_entity_1 = require("../../thread/entities/thread.entity");
const current_time = new Date();
let Comment = class Comment {
    async updateTime() {
        this.updated_at = current_time.getTime().toString();
    }
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Comment.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.id),
    __metadata("design:type", user_entity_1.User)
], Comment.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => thread_entity_1.Thread, (thread) => thread.id),
    __metadata("design:type", thread_entity_1.Thread)
], Comment.prototype, "thread", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: '' }),
    __metadata("design:type", String)
], Comment.prototype, "text", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "audio", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 0 }),
    __metadata("design:type", String)
], Comment.prototype, "likes_count", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], Comment.prototype, "audio_length", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => current_time.getTime().toString() }),
    __metadata("design:type", String)
], Comment.prototype, "created_at", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: false, default: () => current_time.getTime().toString() }),
    __metadata("design:type", String)
], Comment.prototype, "updated_at", void 0);
__decorate([
    (0, typeorm_1.BeforeUpdate)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Comment.prototype, "updateTime", null);
Comment = __decorate([
    (0, typeorm_1.Entity)('comment')
], Comment);
exports.Comment = Comment;
//# sourceMappingURL=comment.entity.js.map