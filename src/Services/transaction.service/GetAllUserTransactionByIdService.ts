import { findTransactionByUserId } from "./utils/dataFinder";
import { AppError } from "../../classes/AppError.utils";
import { IGetAllUserTransactionByIdParams } from "../../interfaces/transaction.interface";

export default async function GetAllUserTransactionByIdService(
  params: IGetAllUserTransactionByIdParams
) {
  try {
    const response = await findTransactionByUserId(params.user_id);
    if (response.length === 0) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}
