import { HttpException, HttpStatus } from '@nestjs/common'

export const fileFilter = (
  req: Express.Request,
  file: Express.Multer.File,
  callback,
) => {
  const fileExtension = file.mimetype.split('/')[1]
  const validFiles = []
  const imageValidFiles = ['jpg', 'jpeg', 'png']
  const audioValidFiles = ['mp3', 'wav', 'mpeg', 'ogg']

  switch (file.fieldname) {
    case 'image':
      validFiles.push(...imageValidFiles)
      break
    case 'audio':
      validFiles.push(...audioValidFiles)
      break
  }
  if (validFiles.some((el) => fileExtension.includes(el)))
    return callback(null, true)
  return callback(
    new HttpException(
      `${file.fieldname} is not a valid document. Accepted file format [${validFiles}]`,
      HttpStatus.UNPROCESSABLE_ENTITY,
    ),
    false,
  )
}
