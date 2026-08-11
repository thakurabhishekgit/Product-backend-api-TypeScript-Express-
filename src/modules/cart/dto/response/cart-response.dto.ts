import type { CartItemResponseDto } from "./cart-item-response.dto.js";

export type CartResponseDto = {
    readonly id: string;
    userId: string;
    items: CartItemResponseDto[];
    itemCount: number;
    totalAmount: string;
    createdAt: Date;
    updatedAt: Date;
};
