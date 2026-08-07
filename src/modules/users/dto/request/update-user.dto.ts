import type { CreateUserRequestDto } from "./create-user.dto.js";

export type UpdateUserRequestDto = Partial<
    Omit<CreateUserRequestDto, "password">
>;
