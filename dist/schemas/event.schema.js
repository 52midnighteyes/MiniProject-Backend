"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetEventDetailsByIdSchema = exports.GetEventAttendersByDateSchema = void 0;
const zod_1 = require("zod");
exports.GetEventAttendersByDateSchema = zod_1.z.object({
    event_id: zod_1.z.uuid().trim().nonempty(),
});
exports.GetEventDetailsByIdSchema = zod_1.z.object({
    event_id: zod_1.z.string().trim().nonempty(),
});
