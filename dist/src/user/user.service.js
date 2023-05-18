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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const argon2 = require("argon2");
const user_entity_1 = require("./entities/user.entity");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const { email, password, name } = createUserDto;
        const isUserExists = await this.findOneByEmail(email);
        if (isUserExists)
            throw new common_1.HttpException('Email already exists', 400);
        const user = new user_entity_1.User();
        Object.assign(user, { email, password, name });
        return await this.userRepository.save(user);
    }
    async update(id, updateUserDto) {
        const existingUser = await this.findOneById(id);
        if (!existingUser)
            throw new common_1.HttpException("User didn't exists", 400);
        const { email } = updateUserDto;
        const userExists = await this.findOneByEmail(email);
        if (email && userExists && userExists.id !== id)
            throw new common_1.HttpException('Email already exists', 400);
        Object.assign(existingUser, updateUserDto);
        return await this.userRepository.save(existingUser);
    }
    async remove(id) {
        const existingUser = await this.findOneById(id);
        if (!existingUser)
            throw new common_1.HttpException("User didn't exists", 400);
        return this.userRepository.delete({ id });
    }
    async validate(email, password) {
        const user = await this.findOneByEmail(email);
        if (!user)
            throw new common_1.HttpException("User didn't exists", 400);
        if (await argon2.verify(user.password, password))
            return user;
        return null;
    }
    findOneById(id) {
        return this.userRepository.findOneBy({ id });
    }
    findOneByEmail(email) {
        return this.userRepository.findOneBy({ email });
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map