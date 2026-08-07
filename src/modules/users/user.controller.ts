import type { NextFunction, Request, Response } from "express";
import { registerUser } from "./user.service.js";

export async function register(
    req: Request,
    res: Response,
    next: NextFunction,
) {
    try {
        const user = await registerUser(req.body);

        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: user,
        });
    } catch (error) {
        next(error);
    }
}
