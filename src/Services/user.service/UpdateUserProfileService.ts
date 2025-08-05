import { response } from "express";
import { AppError } from "../../classes/AppError.utils";
import { IUserUpdateParams } from "../../interfaces/user.interface";
import prisma from "../../lib/prisma";
import { findUserById } from "../auth.service/utils/dataFinder";
import { cloudinaryUpload } from "../../utils/cloudinary";

export default async function UpdateUserProfileService(
  params: IUserUpdateParams
) {
  try {
    const user = await findUserById(params.id);
    if (!user) throw new AppError(404, "no user found");

    const response = await prisma.$transaction(async (tx) => {
      const updateData = tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          ...params,
        },
      });

      return updateData;
    });

    return response;
  } catch (err) {
    throw err;
  }
}
