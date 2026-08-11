import { Router } from "express";
import { createCart, getUserCartDetails } from "./cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/create-cart/:userId", createCart);
cartRoutes.get("/user-with-cart/:userId", getUserCartDetails);

// Suggested later:
// cartRoutes.post("/:userId/items", addItem);
// cartRoutes.patch("/:userId/items/:productId", updateItem);
// cartRoutes.delete("/:userId/items/:productId", removeItem);

export default cartRoutes;
