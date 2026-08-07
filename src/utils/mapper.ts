import type { User } from "@prisma/client";
import type { UserResponseDto } from "../modules/users/dto/response/user-response-dto.js";

export function toUserResponse(user: User): UserResponseDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}
