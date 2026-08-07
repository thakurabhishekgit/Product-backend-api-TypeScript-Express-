import type { CreateUserDto } from "./create-user.dto.js"


export type UpdatePasswordRequestDto =  Omit<CreateUserDto, "password"> & {
    oldPassword: string
    newPassword: string
}