"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = CreateEventService;
const prisma_1 = __importDefault(require("../../lib/prisma"));
const AppError_utils_1 = require("../../classes/AppError.utils");
// === UTILS ===
function slugify(text) {
    return text
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^\w\-]+/g, "")
        .replace(/\-\-+/g, "-")
        .replace(/^-+/, "")
        .replace(/-+$/, "");
}
// === SERVICE ===
async function CreateEventService(params) {
    try {
        const city = params.city.trim().toLowerCase();
        const provinceName = params.province.trim().toLowerCase();
        const categoryName = params.category.trim().toLowerCase();
        let province = await prisma_1.default.province.findFirst({
            where: { name: { equals: provinceName, mode: "insensitive" } },
        });
        if (!province) {
            province = await prisma_1.default.province.create({
                data: { name: provinceName },
            });
        }
        let location = await prisma_1.default.location.findFirst({
            where: {
                city: { equals: city, mode: "insensitive" },
                province_id: province.id,
            },
        });
        if (!location) {
            location = await prisma_1.default.location.create({
                data: {
                    city,
                    province_id: province.id,
                },
            });
        }
        let category = await prisma_1.default.category.findFirst({
            where: {
                name: { equals: categoryName, mode: "insensitive" },
            },
        });
        if (!category) {
            category = await prisma_1.default.category.create({
                data: { name: categoryName },
            });
        }
        let slug = slugify(params.name);
        while (await prisma_1.default.event.findUnique({ where: { slug } })) {
            slug = slugify(`${params.name}-${Math.floor(Math.random() * 9999)}`);
        }
        const event = await prisma_1.default.event.create({
            data: {
                name: params.name,
                description: params.description,
                header: "",
                start_date: new Date(params.start_date),
                end_date: new Date(params.end_date),
                start_time: params.start_time,
                end_time: params.end_time,
                is_free: params.is_free,
                adress: params.adress,
                slug,
                status: "DRAFT",
                organizer_id: params.organizer_id,
                location_id: location.id,
                eventCategories: {
                    create: {
                        category_id: category.id,
                    },
                },
                ticketTypes: {
                    create: params.tickets?.map((ticket) => ({
                        type: ticket.type,
                        price: ticket.price,
                        available_seat: ticket.available_seat,
                        description: ticket.description ?? null,
                    })) || [],
                },
            },
            include: {
                eventCategories: {
                    include: { category: true },
                },
                ticketTypes: true,
            },
        });
        return event;
    }
    catch (err) {
        console.error("[CreateEventService Error]", err);
        throw new AppError_utils_1.AppError(500, "Failed to create event");
    }
}
