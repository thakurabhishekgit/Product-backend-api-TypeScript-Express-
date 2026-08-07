import type { userRole, userstatus } from "@prisma/client";

export type CreateUserRequestDto = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role?: userRole;
    status?: userstatus;
};

export type CreateUserDto = CreateUserRequestDto;
