import type { NextFunction, Request, Response } from "express";
import { getAllUsers, registerUser, userLogin  , getUserById , updateUserById} from "./user.service.js";
import type { UserResponseDto } from "./dto/response/user-response-dto.js";

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

interface GetUserParams {
  id: string;
}

export async function getUserWithId(
    req: Request,
    res: Response,
    next: NextFunction
) {
    try{
        const { id } = req.params
        const user = await getUserById(id)

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
        const {id} = req.params;
       
        const user = await updateUserById(req.body , id)
       
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
 
