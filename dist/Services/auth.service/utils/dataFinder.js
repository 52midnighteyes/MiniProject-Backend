"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findUserByEmail = findUserByEmail;
exports.findUserByRefferal = findUserByRefferal;
exports.findEventById = findEventById;
exports.findUserById = findUserById;
const prisma_1 = __importDefault(require("../../../lib/prisma"));
async function findUserByEmail(email) {
    const response = await prisma_1.default.user.findFirst({
        select: {
            id: true,
            password: true,
            firstname: true,
            lastname: true,
            email: true,
            login_attempt: true,
            is_suspended: true,
            suspended_cooldown: true,
            temp_token: true,
            avatar: true,
            role: {
                select: {
                    name: true,
                    id: true,
                },
            },
        },
        where: {
            email: {
                equals: email,
                mode: "insensitive",
            },
        },
    });
    return response;
}
async function findUserByRefferal(refferal_code) {
    const response = await prisma_1.default.user.findFirst({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            role_id: true,
            role: {
                select: {
                    name: true,
                },
            },
        },
        where: {
            referral_code: {
                equals: refferal_code,
                mode: "insensitive",
            },
        },
    });
    return response;
}
async function findEventById(id) {
    const response = await prisma_1.default.event.findFirst({
        where: {
            id,
        },
        select: {
            id: true,
            name: true,
            is_free: true,
            status: true,
            ticketTypes: {
                select: {
                    id: true,
                    price: true,
                    type: true,
                },
            },
        },
    });
    return response;
}
async function findUserById(id) {
    const response = await prisma_1.default.user.findFirst({
        select: {
            id: true,
            firstname: true,
            lastname: true,
            email: true,
            avatar: true,
        },
        where: {
            id,
        },
    });
    return response;
}
