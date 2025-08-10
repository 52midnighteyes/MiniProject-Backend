"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateUserAvatarController = UpdateUserAvatarController;
const UpdateUserAvatar_1 = __importDefault(require("../Services/user.service/UpdateUserAvatar"));
async function UpdateUserAvatarController(req, res, next) {
    try {
        const { file } = req;
        const id = req.user?.id;
        const response = await (0, UpdateUserAvatar_1.default)({
            avatar: file,
            id,
        });
        res.status(201).json({
            message: "ok",
            data: response,
        });
    }
    catch (err) {
        next(err);
    }
}
