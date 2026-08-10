import type { ProductStatus } from "@prisma/client";

export type CreateProductRequestDto = {
    name: string;
    description?: string;
    sku: string;
    price: number;
    stockQuantity?: number;
    imageUrl?: string;
    status?: ProductStatus;
};

export type CreateProductDto = CreateProductRequestDto;
