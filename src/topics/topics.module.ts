import { Module } from '@nestjs/common';
import { TopicsService } from './topics.service';
import { TopicsController } from './topics.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Topic } from './entities/topic.entity';
import { jwtModule } from 'config/jwtModule';

@Module({
  imports: [TypeOrmModule.forFeature([Topic]), jwtModule],
  controllers: [TopicsController],
  providers: [TopicsService]
})
export class TopicsModule {}
