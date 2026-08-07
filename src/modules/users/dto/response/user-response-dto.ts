import type { userRole, userstatus } from "@prisma/client";

export type UserResponseDto = {
    readonly id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: userRole;
    status: userstatus;
    lastLoginAt: Date;
    createdAt: Date;
    updatedAt: Date;
};
