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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const storage_service_1 = require("../storage/storage.service");
const typeorm_2 = require("typeorm");
const comment_entity_1 = require("./entities/comment.entity");
let CommentService = class CommentService {
    constructor(commentRepository, storageService) {
        this.commentRepository = commentRepository;
        this.storageService = storageService;
    }
    async create(createCommentDto, userId, threadId) {
        const comment = new comment_entity_1.Comment();
        const { audio } = createCommentDto, createdData = __rest(createCommentDto, ["audio"]);
        const newAudioPath = audio
            ? await this.storageService.save('commment/audio-', audio)
            : undefined;
        Object.assign(comment, Object.assign({ user: userId, thread: threadId, audio: newAudioPath }, createdData));
        return await this.commentRepository.save(comment);
    }
};
CommentService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.Comment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        storage_service_1.StorageService])
], CommentService);
exports.CommentService = CommentService;
//# sourceMappingURL=comment.service.js.map