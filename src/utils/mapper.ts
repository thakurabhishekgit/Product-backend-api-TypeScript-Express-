import type { Cart, Product, User } from "@prisma/client";
import type { UserResponseDto } from "../modules/users/dto/response/user-response-dto.js";
import type { ProductResponseDto } from "../modules/products/dto/response/product-response.dto.js";
import type { UserWithProductsResponseDto } from "../modules/users/dto/response/user-with-products-response.dto.js";
import type { UserWithProducts } from "../modules/users/user.repository.js";
import type { CartResponseDto } from "../modules/cart/dto/response/cart-response.dto.js";
import type { CartItemResponseDto } from "../modules/cart/dto/response/cart-item-response.dto.js";
import type { UserWithCartResponseDto } from "../modules/cart/dto/response/cart-user-response.dto.js";
import type {
    CartItemWithProduct,
    CartWithItems,
    UserWithCart,
} from "../modules/cart/cart.repository.js";

export function toUserResponse(user: User): UserResponseDto {
    return {
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        status: user.status,
        lastLoginAt: user.lastLoginAt,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
    };
}

export function toProductResponse(product: Product): ProductResponseDto {
    return {
        id: product.id,
        name: product.name,
        description: product.description,
        sku: product.sku,
        price: product.price,
        stockQuantity: product.stockQuantity,
        imageUrl: product.imageUrl,
        status: product.status,
        createdById: product.createdById,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
    };
}

export function toUserWithProductsResponse(
    user: UserWithProducts,
): UserWithProductsResponseDto {
    return {
        ...toUserResponse(user),
        products: user.produscts.map(toProductResponse),
    };
}

export function toCartItemResponse(
    item: CartItemWithProduct,
): CartItemResponseDto {
    const lineTotal = (Number(item.product.price) * item.quantity).toFixed(2);

    return {
        id: item.id,
        productId: item.productId,
        name: item.product.name,
        sku: item.product.sku,
        price: item.product.price,
        status: item.product.status,
        quantity: item.quantity,
        lineTotal,
    };
}

export function toCartResponse(cart: Cart): CartResponseDto {
    return {
        id: cart.id,
        userId: cart.userId,
        items: [],
        itemCount: 0,
        totalAmount: "0.00",
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
}

export function toCartWithItemsResponse(cart: CartWithItems): CartResponseDto {
    const items = cart.items.map(toCartItemResponse);
    const totalAmount = items
        .reduce((sum, item) => sum + Number(item.lineTotal), 0)
        .toFixed(2);

    return {
        id: cart.id,
        userId: cart.userId,
        items,
        itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
        totalAmount,
        createdAt: cart.createdAt,
        updatedAt: cart.updatedAt,
    };
}

export function toUserWithCartResponse(
    user: UserWithCart,
): UserWithCartResponseDto {
    return {
        ...toUserResponse(user),
        cart: user.cart ? toCartWithItemsResponse(user.cart) : null,
    };
}
