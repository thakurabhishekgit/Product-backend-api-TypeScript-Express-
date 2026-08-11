import { Router } from "express";
import { createCart } from "./cart.controller.js";

const cartRoutes = Router();

cartRoutes.post("/create-cart/:userId", createCart);

// Suggested later:
// cartRoutes.post("/:userId/items", addItem);
// cartRoutes.patch("/:userId/items/:productId", updateItem);
// cartRoutes.delete("/:userId/items/:productId", removeItem);
// cartRoutes.get("/:userId", getCart);

export default cartRoutes;
