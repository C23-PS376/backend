import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
import { Badge } from './entities/badge.entity';
import { Repository } from 'typeorm';
export declare class BadgeService {
    private readonly badgeRepository;
    constructor(badgeRepository: Repository<Badge>);
    create(createBadgeDto: CreateBadgeDto): Promise<Badge>;
    findAll(): Promise<Badge[]>;
    findOne(id: number): Promise<Badge>;
    update(id: number, updateBadgeDto: UpdateBadgeDto): Promise<Badge>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
}
