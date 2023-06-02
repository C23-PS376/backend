"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.fileFilter = void 0;
const common_1 = require("@nestjs/common");
const fileFilter = (req, file, callback) => {
    const fileExtension = file.mimetype.split('/')[1];
    const validFiles = [];
    const imageValidFiles = ['jpg', 'jpeg', 'png'];
    const audioValidFiles = ['mp3', 'wav', 'mpeg', 'ogg'];
    switch (file.fieldname) {
        case 'image':
            validFiles.push(...imageValidFiles);
            break;
        case 'audio':
            validFiles.push(...audioValidFiles);
            break;
    }
    if (validFiles.some((el) => fileExtension.includes(el)))
        return callback(null, true);
    return callback(new common_1.HttpException(`${file.fieldname} is not a valid document. Accepted file format [${validFiles}]`, common_1.HttpStatus.UNPROCESSABLE_ENTITY), false);
};
exports.fileFilter = fileFilter;
//# sourceMappingURL=thread.decorator.js.map