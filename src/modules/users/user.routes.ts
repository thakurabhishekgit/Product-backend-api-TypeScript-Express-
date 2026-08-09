import { Router } from "express";
import { register , getAll, login, getUserWithId, updateUserwithId, getUserA, filter} from "./user.controller.js";
import { validateBody } from "../../middlewares/validate.js";
import { createUserSchema, loginUserSchema } from "./validators/user.validator.js";

const userRoutes = Router();

userRoutes.post("/register", validateBody(createUserSchema), register);

userRoutes.get("/get-all-users" , getAll);

userRoutes.post("/login" , validateBody(loginUserSchema),login)

userRoutes.get("/get-user-by-id/:id", getUserWithId )

userRoutes.put("/update-user/:id" , updateUserwithId)

userRoutes.get("/get-active-users" , getUserA)

userRoutes.get("/filterUser" , filter)

export default userRoutes;
