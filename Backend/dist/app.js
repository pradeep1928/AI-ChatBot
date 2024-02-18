import express from "express";
import morgan from "morgan";
import { config } from "dotenv";
import appRouter from "./routes/index.js";
import cookieParser from "cookie-parser";
import cors from 'cors';
config();
const app = express();
app.use(cors({
    origin: `${process.env.FRONDEND_LINK}`, credentials: true,
    optionSuccessStatus: 200,
    headers: true,
    exposedHeaders: 'Set-Cookie',
    credentials: true,
    allowedHeaders: [
        'Access-Control-Allow-Origin',
        'Content-Type',
        'Authorization'
    ]
}));                                      // "http://0.0.0.0:5173"
app.use(express.json());
app.use(cookieParser(process.env.COOKIE_SECRET));
app.set("trust proxy", 1);
// remove it in production 
app.use(morgan('dev'));
app.use('/api/v1', appRouter);
export default app;
//# sourceMappingURL=app.js.map