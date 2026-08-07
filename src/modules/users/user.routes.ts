import { Router } from "express";
import { register } from "./user.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { createUserSchema } from "./validators/user.validator.js";

const userRoutes = Router();

userRoutes.post("/register", validateBody(createUserSchema), register);

export default userRoutes;
