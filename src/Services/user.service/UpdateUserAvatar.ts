import { AppError } from "../../classes/AppError.utils";
import { IUpdateUserAvatarParams } from "../../interfaces/user.interface";
import prisma from "../../lib/prisma";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { findUserById } from "../auth.service/utils/dataFinder";

export default async function UpdateUserAvatarService(
  params: IUpdateUserAvatarParams
) {
  let avatar: string = "";
  if (params.avatar) {
    const { secure_url } = await cloudinaryUpload(params.avatar);
    avatar = secure_url;
  }
  try {
    const user = await findUserById(params.id);
    if (!user) throw new AppError(404, "no user found");

    const response = await prisma.$transaction(async (tx) => {
      const updateData = tx.user.update({
        where: {
          id: user.id,
        },
        data: {
          avatar,
        },
      });
      return updateData;
    });

    return response;
  } catch (err) {
    throw err;
  }
}
