import type { CreateProductRequestDto } from "./dto/request/create-product.dto.js";
import type { UpdateProductRequestDto } from "./dto/request/update-product.dto.js";
import type { ProductResponseDto } from "./dto/response/product-response.dto.js";
import prisma from "../../config/prisma.js";

import { type Product , ProductStatus  } from "@prisma/client";
import { string } from "zod";




export async function createProduct(
    createdById: string,
    data: CreateProductRequestDto,
): Promise<Product> {
    return prisma.product.create({
        data: {
            ...data,
            createdById,
        },
    });
}

export async function findProductById(
    id: string,
): Promise<Product | null> {
    return prisma.product.findUnique({
        where: { id },
    });
}