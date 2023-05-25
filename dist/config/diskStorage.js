"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.threadMulterModule = void 0;
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const thread_decorator_1 = require("../src/thread/thread.decorator");
exports.threadMulterModule = platform_express_1.MulterModule.registerAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        fileFilter: thread_decorator_1.fileFilter,
        storage: (0, multer_1.diskStorage)({
            destination: configService.get('STORAGE'),
            filename: (req, file, callback) => {
                const randomName = Array(32)
                    .fill(null)
                    .map(() => Math.round(Math.random() * 16).toString(16))
                    .join('');
                callback(null, `${req.url.split('/')[1]}-${file.fieldname}-${randomName}.${file.mimetype.split('/')[1]}`);
            },
        }),
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=diskStorage.js.map