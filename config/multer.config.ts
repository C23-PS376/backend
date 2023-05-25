import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'

import { fileFilter } from '../src/thread/thread.decorator'

export const multerModule = MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async () => ({
    fileFilter: fileFilter
  }),
  inject: [ConfigService],
})