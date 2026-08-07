import { Router } from "express";
import { register , getAll} from "./user.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { createUserSchema } from "./validators/user.validator.js";

const userRoutes = Router();

userRoutes.post("/register", validateBody(createUserSchema), register);

userRoutes.get("/get-all-users" , getAll);

export default userRoutes;
