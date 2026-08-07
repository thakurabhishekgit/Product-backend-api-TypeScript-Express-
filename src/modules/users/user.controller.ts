import type { NextFunction, Request, Response } from "express";
import { getAllUsers, registerUser } from "./user.service.js";

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


export async function getAll(
    _req: Request,
    res: Response,
    next: NextFunction,
) {
    try{
        const users = await getAllUsers();

        return res.status(200).json({
            success: true,
            message: "users fetched successfully",
            data: users
        })
    } catch(error) {
        next(error)
    }
}
