"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multerModule = void 0;
const config_1 = require("@nestjs/config");
const platform_express_1 = require("@nestjs/platform-express");
const thread_decorator_1 = require("../src/thread/thread.decorator");
exports.multerModule = platform_express_1.MulterModule.registerAsync({
    imports: [config_1.ConfigModule],
    useFactory: async () => ({
        fileFilter: thread_decorator_1.fileFilter
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=multer.config.js.map