import type { ProductStatus } from "@prisma/client";
import type { Decimal } from "@prisma/client/runtime/library";

export type ProductResponseDto = {
    readonly id: string;
    name: string;
    description: string | null;
    sku: string;
    price: Decimal;
    stockQuantity: number;
    imageUrl: string | null;
    status: ProductStatus;
    createdById: string;
    createdAt: Date;
    updatedAt: Date;
};
