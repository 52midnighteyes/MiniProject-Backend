import prisma from "../../lib/prisma";
import { AppError } from "../../classes/AppError.utils";

//CUSTOM GENERATED SUPAYA BISA INPUT EVENT... NO MULTER YET... EMERGENCY END POINT.

// === INTERFACE ===
interface TicketInput {
  type: string;
  price: number;
  available_seat: number;
  description?: string;
}

interface ICreateEventParams {
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  start_time: string;
  end_time: string;
  is_free: boolean;
  adress: string;
  city: string;
  province: string;
  category: string;
  organizer_id: string;
  tickets?: TicketInput[];
}

// === UTILS ===
function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^\w\-]+/g, "")
    .replace(/\-\-+/g, "-")
    .replace(/^-+/, "")
    .replace(/-+$/, "");
}

// === SERVICE ===
export default async function CreateEventService(params: ICreateEventParams) {
  try {
    const city = params.city.trim().toLowerCase();
    const provinceName = params.province.trim().toLowerCase();
    const categoryName = params.category.trim().toLowerCase();

    let province = await prisma.province.findFirst({
      where: { name: { equals: provinceName, mode: "insensitive" } },
    });

    if (!province) {
      province = await prisma.province.create({
        data: { name: provinceName },
      });
    }

    let location = await prisma.location.findFirst({
      where: {
        city: { equals: city, mode: "insensitive" },
        province_id: province.id,
      },
    });

    if (!location) {
      location = await prisma.location.create({
        data: {
          city,
          province_id: province.id,
        },
      });
    }

    let category = await prisma.category.findFirst({
      where: {
        name: { equals: categoryName, mode: "insensitive" },
      },
    });

    if (!category) {
      category = await prisma.category.create({
        data: { name: categoryName },
      });
    }

    let slug = slugify(params.name);
    while (await prisma.event.findUnique({ where: { slug } })) {
      slug = slugify(`${params.name}-${Math.floor(Math.random() * 9999)}`);
    }

    const event = await prisma.event.create({
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
          create:
            params.tickets?.map((ticket) => ({
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
  } catch (err) {
    console.error("[CreateEventService Error]", err);
    throw new AppError(500, "Failed to create event");
  }
}
