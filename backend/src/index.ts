import "dotenv/config";
import express from "express";
import cors from "cors"; //npm i --save-dev @types/cors
import swaggerUI from "swagger-ui-express"; //npm i --save-dev @types/swagger-ui-express
import swaggerDoc from "./docs/swagger.json" with {type: "json"};
import { sync, connect } from "./db.ts"; // Getting weirder by the second!!
import appRoutes from "./routes/appRoutes.ts";

const port = process.env.PORT;
const host = "localhost";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/docs", swaggerUI.serve, swaggerUI.setup(swaggerDoc));
appRoutes(app);

app.listen(port, async()=> {
    if (process.env.SYNC === "true") {
        await sync();
    }
    console.log(`API töötab aadressil http://${host}:${port}`);
});
