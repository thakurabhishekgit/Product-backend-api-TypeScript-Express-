import type { NextFunction , Request , Response} from "express";
import { AppError } from "../../utils/app-error.js";
import { addProduct } from "./product.service.js";



function getRouteUserId(req: Request): string {
    const id = req.params.userId;

    if (typeof id !== "string" || !id) {
        throw new AppError("Invalid user id", 400);
    }

    return id;
}

export async function newProduct (
    req: Request,
    res: Response,
    next: NextFunction
) {
    
    try{
            
        const id = getRouteUserId(req);
        const data = await addProduct(id , req.body);
    
            return res.status(200).json({
                success: true,
                message: "users logined successfully",
                data: data
            }) 
        } catch(error) {
            next(error)
        }
}