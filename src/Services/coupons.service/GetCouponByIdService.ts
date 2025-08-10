import prisma from "../../lib/prisma";

export async function GetCouponByIdService(user_id: string) {
  try {
    const response = await prisma.coupon.findMany({
      where: {
        user_id,
        expired_date: {
          gte: new Date(),
        },
        is_used: false,
      },
    });

    if (response.length === 0) {
      return { message: "user has no coupon" };
    }

    return response;
  } catch (err) {
    throw err;
  }
}
