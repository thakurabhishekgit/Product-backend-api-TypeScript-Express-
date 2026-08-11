import type { Cart } from "@prisma/client";
import prisma from "../../config/prisma.js";



// Cart DB queries go here
// Examples to implement:
// - findCartByUserId
// - createCart
// - findCartItem
// - addCartItem / upsertCartItem
// - updateCartItemQuantity
// - removeCartItem
// - getCartWithItems



export async function findCartByUserId(
    userId: string,
): Promise<Cart | null> {
    return prisma.cart.findUnique({
        where: {
            userId,
        },
    });
}

export async function createCart(
    userId: string,
): Promise<Cart> {
    return prisma.cart.create({
        data: {
            userId,
        },
    });
}
