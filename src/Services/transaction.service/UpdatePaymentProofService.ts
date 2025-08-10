import { AppError } from "../../classes/AppError.utils";
import { ICreatePaymentService } from "../../interfaces/transaction.interface";
import prisma from "../../lib/prisma";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { findUserById } from "../auth.service/utils/dataFinder";

export default async function CreatePaymentService(
  params: ICreatePaymentService
) {
  let payment_proof: string = "";
  if (params.payment_proof) {
    const { secure_url } = await cloudinaryUpload(params.payment_proof);
    payment_proof = secure_url;
  }

  try {
    const user = await findUserById(params.user_id);
    if (!user) throw new AppError(404, "no user found");
    const response = await prisma.transaction.update({
      where: {
        id: params.transaction_id,
      },
      data: {
        payment_proof,
        status: "WAITING_FOR_CONFIRMATION",
      },
    });
    return response;
  } catch (err) {
    throw err;
  }
}
