import { AppError } from "../../utils/app-error.js";
import { toCartResponse } from "../../utils/mapper.js";
import { findUserById } from "../users/user.repository.js";
import type { CartResponseDto } from "./dto/response/cart-response.dto.js";
import { createCart, findCartByUserId } from "./cart.repository.js";

export async function createCartForUser(
    userId: string,
): Promise<CartResponseDto> {
    if (!userId) {
        throw new AppError("User id is required", 400);
    }

    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User does not exist", 404);
    }

    const existingCart = await findCartByUserId(userId);

    if (existingCart) {
        throw new AppError("Cart already exists for this user", 409);
    }

    const cart = await createCart(userId);

    return toCartResponse(cart);
}
