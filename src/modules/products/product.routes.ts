import { Router } from "express";
import { newProduct } from "./product.controller.js";


const productRoutes = Router()


productRoutes.post("/addProduct/:userId", newProduct);





export default productRoutes;