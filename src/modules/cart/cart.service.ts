import { AppError } from "../../utils/app-error.js";
import {
    toCartItemResponse,
    toCartResponse,
    toUserWithCartResponse,
} from "../../utils/mapper.js";
import { findUserById } from "../users/user.repository.js";
import { findProductById } from "../products/product.repository.js";
import type { CartResponseDto } from "./dto/response/cart-response.dto.js";
import type { CartItemResponseDto } from "./dto/response/cart-item-response.dto.js";
import type { UserWithCartResponseDto } from "./dto/response/cart-user-response.dto.js";
import type { AddToCartRequestDto } from "./dto/request/add-to-cart.dto.js";
import {
    addCartItem,
    createCart,
    findCartByUserId,
    findUserWithCart,
} from "./cart.repository.js";

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

export async function getUserWithCart(
    userId: string,
): Promise<UserWithCartResponseDto> {
    if (!userId) {
        throw new AppError("User id is required", 400);
    }

    const user = await findUserWithCart(userId);

    if (!user) {
        throw new AppError("User does not exist", 404);
    }

    return toUserWithCartResponse(user);
}

async function getOrCreateCart(userId: string) {
    const existingCart = await findCartByUserId(userId);

    if (existingCart) {
        return existingCart;
    }

    return createCart(userId);
}

export async function addProductToCart(
    userId: string,
    dto: AddToCartRequestDto,
): Promise<CartItemResponseDto> {
    if (!userId) {
        throw new AppError("User id is required", 400);
    }

    const user = await findUserById(userId);

    if (!user) {
        throw new AppError("User does not exist", 404);
    }

    const product = await findProductById(dto.productId);

    if (!product || product.deletedAt) {
        throw new AppError("Product does not exist", 404);
    }

    if (product.status === "DISCONTINUED") {
        throw new AppError("Cannot add discontinued product to cart", 400);
    }

    const quantity = dto.quantity ?? 1;
    const cart = await getOrCreateCart(userId);
    const cartItem = await addCartItem(cart.id, dto.productId, quantity);

    return toCartItemResponse(cartItem);
}
