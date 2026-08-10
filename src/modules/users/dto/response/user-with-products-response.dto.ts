import type { ProductResponseDto } from "../../../products/dto/response/product-response.dto.js";
import type { UserResponseDto } from "./user-response-dto.js";

export type UserWithProductsResponseDto = UserResponseDto & {
    products: ProductResponseDto[];
};
