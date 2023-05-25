import { ConfigModule, ConfigService } from '@nestjs/config'
import { MulterModule } from '@nestjs/platform-express'
import { diskStorage } from 'multer'

import { fileFilter } from '../src/thread/thread.decorator'

export const threadMulterModule = MulterModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (configService: ConfigService) => ({
    fileFilter: fileFilter,
        storage: diskStorage({
          destination: configService.get<string>('STORAGE'),
          filename: (req, file, callback) => {
            const randomName = Array(32)
              .fill(null)
              .map(() => Math.round(Math.random() * 16).toString(16))
              .join('')
            callback(null, `${req.url.split('/')[1]}-${file.fieldname}-${randomName}.${file.mimetype.split('/')[1]}`)
          },
        }),
  }),
  inject: [ConfigService],
})