import { AppError } from "../../classes/AppError.utils";
import { IUpdateTransactionStatus } from "../../interfaces/transaction.interface";
import prisma from "../../lib/prisma";

export default async function UpdateTransaction(
  params: IUpdateTransactionStatus
) {
  try {
    const response = await prisma.transaction.update({
      where: {
        id: params.id,
      },
      data: {
        status: params.status,
      },
    });

    if (!response) throw new AppError(404, "Data not found");

    return response;
  } catch (err) {
    throw err;
  }
}
