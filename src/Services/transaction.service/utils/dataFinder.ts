import { response } from "express";
import prisma from "../../../lib/prisma";

export async function findTransactionByEventId(event_id: string) {
  const response = await prisma.transaction.findMany({
    where: {
      event_id,
    },
  });

  return response;
}
export async function findTransactionByUserId(user_id: string) {
  const response = await prisma.transaction.findMany({
    where: {
      user_id,
    },
  });

  return response;
}
