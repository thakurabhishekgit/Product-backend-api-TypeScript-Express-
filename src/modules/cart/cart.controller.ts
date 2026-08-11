import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error.js";
import {
    addProductToCart,
    createCartForUser,
    getUserWithCart,
} from "./cart.service.js";

function getRouteUserId(req: Request): string {
    const userId = req.params.userId;

    if (typeof userId !== "string" || !userId) {
        throw new AppError("Invalid user id", 400);
    }

    return userId;
}

export async function createCart(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const userId = getRouteUserId(req);
        const cart = await createCartForUser(userId);

        return res.status(201).json({
            success: true,
            message: "Cart created successfully",
            data: cart,
        });
    } catch (error) {
        next(error);
    }
}

export async function getUserCartDetails(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const userId = getRouteUserId(req);
        const data = await getUserWithCart(userId);

        return res.status(200).json({
            success: true,
            message: "User cart details fetched successfully",
            data,
        });
    } catch (error) {
        next(error);
    }
}

export async function addItem(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const userId = getRouteUserId(req);
        const item = await addProductToCart(userId, req.body);

        return res.status(200).json({
            success: true,
            message: "Product added to cart successfully",
            data: item,
        });
    } catch (error) {
        next(error);
    }
}
