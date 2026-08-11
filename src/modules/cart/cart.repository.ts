// Cart DB queries go here
// Examples to implement:
// - findCartByUserId
// - createCart
// - findCartItem
// - addCartItem / upsertCartItem
// - updateCartItemQuantity
// - removeCartItem
// - getCartWithItems

import prisma from "../../config/prisma.js";
import type { CartResponseDto } from "./dto/response/cart-response.dto.js";



export async function findCartByUserId (
    userId: string
): Promise<CartResponseDto> {
    return prisma
}