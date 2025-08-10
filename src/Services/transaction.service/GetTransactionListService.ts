import { AppError } from "../../classes/AppError.utils";
import prisma from "../../lib/prisma";

interface IGetTransactiionDetails {
  transaction_id: string;
  user_id: string;
}

export default async function GetTransactionDetailsService(
  params: IGetTransactiionDetails
) {
  try {
    const transaction = await prisma.transaction.findFirst({
      where: {
        id: params.transaction_id,
        user_id: params.user_id,
      },
    });
    if (!transaction) throw new AppError(404, "transaction not found");
  } catch (err) {
    throw err;
  }
}
