import { IGetEventTransactionParams } from "../../interfaces/transaction.interface";
import { findTransactionByEventId } from "./utils/dataFinder";
import { AppError } from "../../classes/AppError.utils";

export default async function GetTransactionsByEventIdService(
  params: IGetEventTransactionParams
) {
  try {
    const response = await findTransactionByEventId(params.event_id);
    if (response.length === 0) throw new AppError(404, "data not found");
    return response;
  } catch (err) {
    throw err;
  }
}
