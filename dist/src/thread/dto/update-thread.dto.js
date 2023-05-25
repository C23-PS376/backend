"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateThreadDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_thread_dto_1 = require("./create-thread.dto");
class UpdateThreadDto extends (0, mapped_types_1.PartialType)(create_thread_dto_1.CreateThreadDto) {
}
exports.UpdateThreadDto = UpdateThreadDto;
//# sourceMappingURL=update-thread.dto.js.map