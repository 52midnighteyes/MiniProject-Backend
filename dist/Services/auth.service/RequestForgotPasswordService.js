"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = RequestForgotPasswordRepo;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const dataFinder_1 = require("./utils/dataFinder");
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const nodemailer_1 = __importDefault(require("../../lib/nodemailer"));
const handlebars_1 = __importDefault(require("handlebars"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
async function RequestForgotPasswordRepo(params) {
    try {
        const response = await (0, dataFinder_1.findUserByEmail)(params);
        if (!response) {
            return console.log("email isnt valid");
        }
        const payload = {
            id: response.id,
            firstname: response.firstname,
            lastname: response.lastname,
            email: response.email,
            role: {
                role_id: response.role.id,
                name: response.role.name,
            },
        };
        const token = (0, jsonwebtoken_1.sign)(payload, config_1.SECRET_KEY, { expiresIn: "1h" });
        await prisma_1.default.$transaction(async (tx) => {
            await tx.user.update({
                where: {
                    email: params,
                },
                data: {
                    temp_token: token,
                },
            });
        });
        const hbsPath = path_1.default.join(__dirname, "../../handlebars-templates/ForgotPasswordRequest.template.hbs");
        const readHbs = fs_1.default.readFileSync(hbsPath, "utf-8");
        const compileHbs = handlebars_1.default.compile(readHbs);
        const html = compileHbs({
            name: `${response.firstname} ${response.lastname}`,
            token: token,
            domain: `${config_1.FE_URL}/pages/auth/reset-password-by-token`,
        });
        await nodemailer_1.default.sendMail({
            to: response.email,
            subject: "Reset Password Request",
            html: html,
        });
    }
    catch (err) {
        throw err;
    }
}
