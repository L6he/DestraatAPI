import express, { type Request, type Response, type NextFunction } from "express"; //"3 high severity vulnerabilities" oops...
import { error } from "node:console";
const app = express();
const PORT = process.env.PORT || 3000;

const wads = [
    { id: 1, name: "Valley.wad", rating:4},
    { id: 5, name: "Eviternity.wad", rating:5},
    { id: 10, name: "LostCivilisation.wad", rating:5}
]

app.get("/", (req:Request, res: Response) => {
    res.send(`Töötab. Süntaks: /wads ja /wads/{id}`);
});

app.get("/wads", (req:Request, res: Response) => {
    const result = wads.map(wad => ({ id: wad.id, name: wad.name }));
    res.send(result);
});

app.get("/wads/:id", (req:Request, res: Response) => {
    if (!req.params.id) { //allegedly obsolete
        return res.status(400).send({error: "ID required"});
    }
    const wadId = req.params.id ? 
        typeof req.params.id === "string" ?
        parseInt(req.params.id) : parseInt(req.params.id[0]!)
        : null;
    const result = wads.filter(wad => wad.id === wadId);
    if (typeof result[0] === 'undefined') {
        return res.status(404).send({error: "WAD not found" });
    }
    res.send(result);
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