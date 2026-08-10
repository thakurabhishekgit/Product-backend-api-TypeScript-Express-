import type { NextFunction, Request, Response } from "express";
import { getAllUsers, registerUser, userLogin  , getUserById , updateUserById, getActiveUsers, userFilter} from "./user.service.js";
import { userRole, userstatus } from "@prisma/client";
import { AppError } from "../../utils/app-error.js";

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


export async function login(
    req: Request,
    res: Response ,
    next: NextFunction
)  {
    try{
        const { email, password } = req.body;
        const user = await userLogin(email , password);

        return res.status(200).json({
            success: true,
            message: "users logined successfully",
            data: user
        }) 
    } catch(error) {
        next(error)
    }
}

function getRouteId(req: Request): string {
    const id = req.params.id;

    if (typeof id !== "string" || !id) {
        throw new AppError("Invalid user id", 400);
    }

    return id;
}

export async function getUserWithId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        const id = getRouteId(req);
        const user = await getUserById(id);

        return res.status(200).json(
            {
                success: true,
                message: `users fetched successfully with id ${id}`,
                data: user
            }
        )
    } catch(error) {
        next(error)
    }
}


export async function updateUserwithId (
    req: Request,
    res: Response,
    next: NextFunction
) {
    try {
        const id = getRouteId(req);

        const user = await updateUserById(req.body, id);
       
        return res.status(200).json(
            {
                success: true,
                message: `users updated successfully with id ${id}`,
                data: user
            }
        )
    }catch(error) {
        next(error)
    }
    
}


export async function getUserA(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        const data = await getActiveUsers();
        
        return res.status(200).json(
            {
                success: true,
                message: `users fetcehd successfully with status Active `,
                data: data
            }
        )
    } catch(error) {
        next(error)
    }
}



export async function filter(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{

        const role = req.query.role as userRole | undefined;
        const status = req.query.status as userstatus | undefined;
        const data = await userFilter(role , status);
        
        return res.status(200).json(
            {
                success: true,
                message: `users fetcehd successfully with query ${role} and ${status} `,
                data: data
            }
        )
    } catch(error) {
        next(error)
    }
}
 
