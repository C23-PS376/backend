"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtModule = void 0;
const jwt_1 = require("@nestjs/jwt");
const config_1 = require("@nestjs/config");
exports.jwtModule = jwt_1.JwtModule.registerAsync({
    imports: [config_1.ConfigModule],
    useFactory: async (configService) => ({
        global: true,
        secret: configService.get('JWT_SECRET'),
        signOptions: { expiresIn: configService.get('JWT_EXP') },
    }),
    inject: [config_1.ConfigService],
});
//# sourceMappingURL=jwtModule.js.map