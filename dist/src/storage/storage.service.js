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
exports.StorageService = void 0;
const storage_1 = require("@google-cloud/storage");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
let StorageService = class StorageService {
    constructor(configService) {
        this.configService = configService;
        this.storage = new storage_1.Storage({
            projectId: this.configService.get('PROJECT_ID'),
        });
        this.bucket = this.configService.get('STORAGE_MEDIA_BUCKET');
    }
    async save(directory, file) {
        if (file) {
            const path = this.generatePath(directory, file);
            const uploadedFile = this.storage.bucket(this.bucket).file(path);
            const stream = uploadedFile.createWriteStream();
            stream.end(file.buffer);
            return `https://storage.googleapis.com/${this.bucket}/${path}`;
        }
        return undefined;
    }
    async removeFileIfExists(path) {
        if (path) {
            await this.storage
                .bucket(this.bucket)
                .file(path)
                .delete({ ignoreNotFound: true });
        }
    }
    generatePath(directory, file) {
        const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');
        return `${directory}${randomName}.${file.mimetype.split('/')[1]}`;
    }
    getFilenameFromPath(path) {
        return path.split(`https://storage.googleapis.com/${this.bucket}/`)[1];
    }
};
StorageService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [config_1.ConfigService])
], StorageService);
exports.StorageService = StorageService;
//# sourceMappingURL=storage.service.js.map