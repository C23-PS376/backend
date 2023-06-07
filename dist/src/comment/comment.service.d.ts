import { StorageService } from 'src/storage/storage.service';
import { Repository } from 'typeorm';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from './entities/comment.entity';
export declare class CommentService {
    private readonly commentRepository;
    private readonly storageService;
    constructor(commentRepository: Repository<Comment>, storageService: StorageService);
    create(createCommentDto: CreateCommentDto, userId: string, threadId: string): Promise<Comment>;
}
