import "dotenv/config";
import express from "express"; // npm i --save-dev @types/express
import cors from "cors"; //npm i --save-dev @types/cors
import swaggerUI from "swagger-ui-express"; //npm i --save-dev @types/swagger-ui-express
import swaggerDoc from "./docs/swagger-autogen.json" with {type: "json"};
import { sync, connect } from "./db.ts"; // Getting weirder by the second!!
import appRoutes from "./routes/appRoutes.ts";
import cookieParser from "cookie-parser";

const port = process.env.PORT;
const host = "localhost";

const app = express();

const frontendURL = process.env.FRONTEND_URL;

if (!process.env.JWT_SECRET || !frontendURL) {
    throw new Error ("JWT secret or frontend URL are not configured.");
    //siis jookseb kokku
}

app.use(cors({
    origin: frontendURL,
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

app.use((req,res,next) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method)) {
        return next();
    }
    const origin = req.get("Origin");
    if (origin !== frontendURL) {
        return res.status(403).send({error: "Request origin not allowed"});
    }
    next();
});

app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
appRoutes(app);

app.listen(port, async()=> {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${port}`);
});
