import type { UserResponseDto } from "../../../users/dto/response/user-response-dto.js";
import type { CartResponseDto } from "./cart-response.dto.js";

export type UserWithCartResponseDto = UserResponseDto & {
    cart: CartResponseDto | null;
};
