import type { CreateUserRequestDto } from "./dto/request/create-user.dto.js";
import type { UserResponseDto } from "./dto/response/user-response-dto.js";
import type {UpdateUserRequestDto} from "./dto/request/update-user.dto.js"
import { createUser, findUserByEmail , findUserById, getAllusers, updateLastLogin, updateUser } from "./user.repository.js";
import { toUserResponse } from "../../utils/mapper.js";
import { comparePassword, hashPassword } from "../../utils/password.js";
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


export async function userLogin(
    email: string,
    password: string
): Promise<UserResponseDto> {
    if (!email || !password) {
        throw new AppError("Enter both email and password", 401);
    }

    const user = await findUserByEmail(email);

    if (!user) {
    throw new AppError("cannot find user with this email ", 401);
  }

    const userPass = password
    const compare = await comparePassword(userPass , user.password)

    if (!compare) {
        throw new AppError("Invalid email or password", 401);
    }

    const updatedUser = await updateLastLogin(user.id);
    return toUserResponse(updatedUser);
}


export async function getAllUsers(): Promise<UserResponseDto[]> {
   
    return getAllusers();

}


export async function getUserById(
    id: string
): Promise<UserResponseDto> {

    if (!id) {
        throw  new AppError("cannot find user with this id ", 401);
    }
    console.log("id of the user " , id)
    const user = await findUserById(id)
    console.log("user",user);
    if (!user) {
        throw new AppError("user dosen't exists", 409);
    }

    return toUserResponse(user);


}



export async function updateUserById(
    dto: UpdateUserRequestDto,
    id: string,
): Promise<UserResponseDto> {
    const existingUser = await findUserById(id);

    if (!existingUser) {
        throw new AppError("cannot find user with this id", 404);
    }

    if (dto.email && dto.email !== existingUser.email) {
        const emailTaken = await findUserByEmail(dto.email);

        if (emailTaken) {
            throw new AppError("Email already exists", 409);
        }
    }

    const updatedUser = await updateUser(
        {
            firstName: dto.firstName,
            lastName: dto.lastName,
            email: dto.email,
            role: dto.role,
            status: dto.status,
        },
        id,
    );

    return toUserResponse(updatedUser);
}

