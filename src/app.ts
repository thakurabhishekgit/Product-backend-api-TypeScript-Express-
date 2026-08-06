import express,{type Request , type Response} from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

const app = express();


app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(morgan("common"));


app.get("/" , (req: Request, res: Response) => {
    res.status(200)
    .json({
        success: true,
        message: "Welcome to the Product Management API"
    })
})


export default app;
