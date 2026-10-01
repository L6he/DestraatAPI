import express, { type Request, type Response, type NextFunction } from "express";

const app = express();
const PORT = process.env.PORT || 3000;

app.get("/", (req:Request, res: Response) => {
    res.send("Töötab?");
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})
//npm install express
//npm i --save-dev @types/express
//https://www.w3schools.com/typescript/typescript_nodejs.php
//npm i --save-dev ts-node nodemon

//npm run build
//npm run dev    prolly doesn't work
//npm run start        works