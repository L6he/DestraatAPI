import "dotenv/config";
import express from "express";
import cors from "cors"; //npm i --save-dev @types/cors
import { sync, connect } from "../db.ts"; // Getting weirder by the second!!

import appRoutes from "../routes/appRoutes.ts";

const port = process.env.PORT || 8080;
const host = "localhost";

const app = express();

app.use(cors());
app.use(express.json());
appRoutes(app);

app.listen(port, async()=> {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${port}`);
})