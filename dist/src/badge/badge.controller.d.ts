import { BadgeService } from './badge.service';
import { CreateBadgeDto } from './dto/create-badge.dto';
import { UpdateBadgeDto } from './dto/update-badge.dto';
export declare class BadgeController {
    private readonly badgeService;
    constructor(badgeService: BadgeService);
    create(createBadgeDto: CreateBadgeDto): Promise<{
        statusCode: number;
        data: Promise<import("./entities/badge.entity").Badge>;
    }>;
    findAll(): Promise<{
        statusCode: number;
        data: import("./entities/badge.entity").Badge[];
    }>;
    findOne(id: string): Promise<{
        statusCode: number;
        data: import("./entities/badge.entity").Badge;
    }>;
    update(id: string, updateBadgeDto: UpdateBadgeDto): Promise<{
        statusCode: number;
        data: import("./entities/badge.entity").Badge;
    }>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
