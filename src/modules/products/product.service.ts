import { AppError } from "../../utils/app-error.js";
import { toProductResponse } from "../../utils/mapper.js";
import { findUserById } from "../users/user.repository.js";
import type { CreateProductDto } from "./dto/request/create-product.dto.js";
import type { ProductResponseDto } from "./dto/response/product-response.dto.js";
import { createProduct } from "./product.repository.js";



export async function addProduct(
    id: string,
    data: CreateProductDto
): Promise<ProductResponseDto> {

    if (!id) {
        throw  new AppError("enter user id ", 404);
    }

    const isUser = await findUserById(id);

    if (!isUser) {
        throw new AppError("Cannot find user with id ${id)" , 404)
    }

    const product = await createProduct(id , data);

    return toProductResponse(product);


}