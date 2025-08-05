import { response } from "express";
import prisma from "../../../lib/prisma";

export async function findUserByEmail(email: string) {
  const response = await prisma.user.findFirst({
    select: {
      id: true,
      password: true,
      firstname: true,
      lastname: true,
      email: true,
      login_attempt: true,
      is_suspended: true,
      suspended_cooldown: true,
      temp_token: true,
      avatar: true,
      role: {
        select: {
          name: true,
          id: true,
        },
      },
    },
    where: {
      email: {
        equals: email,
        mode: "insensitive",
      },
    },
  });

  return response;
}

export async function findUserByRefferal(refferal_code: string) {
  const response = await prisma.user.findFirst({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      role_id: true,
      role: {
        select: {
          name: true,
        },
      },
    },
    where: {
      referral_code: {
        equals: refferal_code,
        mode: "insensitive",
      },
    },
  });

  return response;
}

export async function findEventById(id: string) {
  const response = await prisma.event.findFirst({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      is_free: true,
      status: true,
      ticketTypes: {
        select: {
          id: true,
          price: true,
          type: true,
        },
      },
    },
  });

  return response;
}

export async function findUserById(id: string) {
  const response = await prisma.user.findFirst({
    select: {
      id: true,
      firstname: true,
      lastname: true,
      email: true,
      avatar: true,
    },
    where: {
      id,
    },
  });

  return response;
}
