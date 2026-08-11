import type { Decimal } from "@prisma/client/runtime/library";
import type { ProductStatus } from "@prisma/client";

export type CartItemResponseDto = {
    readonly id: string;
    productId: string;
    name: string;
    sku: string;
    price: Decimal;
    status: ProductStatus;
    quantity: number;
    lineTotal: Decimal | string;
};
