import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UserModule } from './user/user.module'
import { User } from './user/entities/user.entity'
import { AuthModule } from './auth/auth.module'
import { ThreadModule } from './thread/thread.module'
import { StorageModule } from './storage/storage.module'
import { CommentModule } from './comment/comment.module';
import { LikeThreadsModule } from './thread-like/thread-like.module'
import { Thread } from './thread/entities/thread.entity'
import { LikeThread } from './thread-like/entities/thread-like.entity'
import { TopicsModule } from './topics/topics.module';
import { BadgeModule } from './badge/badge.module';
import { CommentLikeModule } from './comment-like/comment-like.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: +configService.get<number>('DB_PORT'),
        username: configService.get('DB_USERNAME'),
        password: configService.get('DB_PASSWORD'),
        database: configService.get('DB_NAME'),
        entities: [User, Thread, LikeThread],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
    ThreadModule,
    StorageModule,
    CommentModule,
    LikeThreadsModule,
    TopicsModule,
    BadgeModule,
    CommentLikeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
