import type { CreateUserRequestDto } from "./dto/request/create-user.dto.js";
import type { UserResponseDto } from "./dto/response/user-response-dto.js";
import { createUser, findUserByEmail , getAllusers} from "./user.repository.js";
import { toUserResponse } from "../../utils/mapper.js";
import { hashPassword } from "../../utils/password.js";
import { AppError } from "../../utils/app-error.js";

export async function registerUser(
    dto: CreateUserRequestDto,
): Promise<UserResponseDto> {
    const existingUser = await findUserByEmail(dto.email);

    if (existingUser) {
        throw new AppError("Email already exists", 409);
    }

    const hashedPassword = await hashPassword(dto.password);

    const user = await createUser({
        firstName: dto.firstName,
        lastName: dto.lastName,
        email: dto.email,
        password: hashedPassword,
        role: dto.role,
        status: dto.status,
    });

    return toUserResponse(user);
}


export async function getAllUsers(): Promise<UserResponseDto[]> {
   
    return getAllusers();
    
}
