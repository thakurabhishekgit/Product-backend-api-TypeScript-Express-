// Cart DB queries go here
// Examples to implement:
// - findCartByUserId
// - createCart
// - findCartItem
// - addCartItem / upsertCartItem
// - updateCartItemQuantity
// - removeCartItem
// - getCartWithItems




import type { Cart, CartItem, Product, User } from "@prisma/client";
import prisma from "../../config/prisma.js";

export type CartItemWithProduct = CartItem & {
    product: Product;
};

export type CartWithItems = Cart & {
    items: CartItemWithProduct[];
};

export type UserWithCart = User & {
    cart: CartWithItems | null;
};

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

export async function findUserWithCart(
    userId: string,
): Promise<UserWithCart | null> {
    return prisma.user.findUnique({
        where: {
            id: userId,
        },
        include: {
            cart: {
                include: {
                    items: {
                        include: {
                            product: true,
                        },
                        orderBy: {
                            createdAt: "desc",
                        },
                    },
                },
            },
        },
    });
}

export async function addCartItem(
    cartId: string,
    productId: string,
    quantity: number = 1,
) {
    return prisma.cartItem.upsert({
        where: {
            cartId_productId: {
                cartId,
                productId,
            },
        },
        create: {
            cartId,
            productId,
            quantity,
        },
        update: {
            quantity: {
                increment: quantity,
            },
        },
        include: {
            product: true,
        },
    });
}