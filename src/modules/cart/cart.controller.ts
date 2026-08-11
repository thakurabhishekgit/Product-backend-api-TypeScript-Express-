import type { NextFunction, Request, Response } from "express";
import { AppError } from "../../utils/app-error.js";
import { createCartForUser } from "./cart.service.js";

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
