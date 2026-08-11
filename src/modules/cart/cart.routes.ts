import { Router } from "express";
import { addItem, createCart, getUserCartDetails } from "./cart.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { addToCartSchema } from "./validators/cart.validator.js";

const cartRoutes = Router();

cartRoutes.post("/create-cart/:userId", createCart);
cartRoutes.get("/user-with-cart/:userId", getUserCartDetails);
cartRoutes.post(
    "/:userId/items",
    validateBody(addToCartSchema),
    addItem,
);

export default cartRoutes;
