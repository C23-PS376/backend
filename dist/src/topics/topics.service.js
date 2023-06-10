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
exports.TopicsService = void 0;
const common_1 = require("@nestjs/common");
const topic_entity_1 = require("./entities/topic.entity");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
let TopicsService = class TopicsService {
    constructor(topicRepository) {
        this.topicRepository = topicRepository;
    }
    async create(createTopicDto) {
        const { name } = createTopicDto;
        const isTopicExists = await this.topicRepository.findOneBy({ name });
        if (isTopicExists)
            throw new common_1.HttpException('The topic already exists', 400);
        const topic = new topic_entity_1.Topic();
        Object.assign(topic, { name });
        return await this.topicRepository.save(topic);
    }
    async findAll() {
        return await this.topicRepository.find();
    }
    async findOne(id) {
        return this.topicRepository.findOneBy({ id });
    }
    async update(id, updateTopicDto) {
        const topic = await this.topicRepository.findOneBy({ id });
        if (!topic)
            throw new common_1.HttpException("Topic doesn't exists", 400);
        Object.assign(topic, updateTopicDto);
        return await this.topicRepository.save(topic);
    }
    async remove(id) {
        const topic = await this.topicRepository.findOneBy({ id });
        if (!topic)
            throw new common_1.HttpException("Topic doesn't exists", 400);
        return this.topicRepository.delete({ id });
    }
};
TopicsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(topic_entity_1.Topic)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], TopicsService);
exports.TopicsService = TopicsService;
//# sourceMappingURL=topics.service.js.map