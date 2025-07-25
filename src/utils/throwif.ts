import { AppError } from "./classes/AppError.utils";

export function throwIf(condition: boolean, status: number, message: string) {
  if (condition) throw new AppError(status, message);
}

// kita jadinya ga pake throw new error tapi pake
// throwIf(!user, 404, 'User not found')
