import express, { type Request, type Response } from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import userRoutes from "./modules/users/user.routes.js";
import productRoutes from "./modules/products/product.routes.js";
import cartRoutes from "./modules/cart/cart.routes.js";
import { errorHandler } from "./middlewares/error-handler.js";

const app = express();

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({
        success: true,
        message: "Welcome to the Product Management API",
    });
});

app.use("/api/users", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);

app.use(errorHandler);

export default app;
