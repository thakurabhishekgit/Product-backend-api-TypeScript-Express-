import { userRole, userstatus, type User } from "@prisma/client";
import prisma from "../../config/prisma.js";
import type { CreateUserRequestDto } from "./dto/request/create-user.dto.js";
import type { UpdateUserRequestDto } from "./dto/request/update-user.dto.js";



export async function createUser(
    data: CreateUserRequestDto,
): Promise<User> {

    return prisma.user.create({
        data,
    });

}

export async function updateUser(
    data: UpdateUserRequestDto,
    id: string,
): Promise<User> {
    return prisma.user.update({
        where: {
            id,
        },
        data,
    });
}


export async function getAllusers(): Promise<User[]> {
    return prisma.user.findMany();
}

export async function findUserByEmail(
    email: string,
): Promise<User | null> {

    return prisma.user.findUnique({
        where: {
            email,
        },
    });

}


export async function findUserById(
    id: string,
): Promise<User | null> {
    return prisma.user.findUnique({
        where:{
            id,
        }
    })
}

export async function updateLastLogin(
  id: string,
): Promise<User> {
  return prisma.user.update({
    where: {
      id,
    },
    data: {
      lastLoginAt: new Date(),
    },
  });
}



export async function getActive(): Promise<User[]> {
    return prisma.user.findMany({
        where: {
            status: "ACTIVE",
        },
    });
}




export async function findUsers(
  role?: userRole,
  status?: userstatus,
): Promise<User[]> {
  return prisma.user.findMany({
    where: {
      role,
      status,
    },
  });
}