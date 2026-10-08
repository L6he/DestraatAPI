import express, { type Request, type Response, type NextFunction } from "express"; //"3 high severity vulnerabilities" oops...
import { error } from "node:console";
import type { InspectColor } from "node:util";
const app = express();
const PORT = process.env.PORT || 3000;

let nextWadId = 0;
const wads: {id: number, name: string, rating?:number|undefined}[] = [
    { id: nextWadId++, name: "Valley.wad"},
    { id: nextWadId++, name: "Eviternity.wad", rating:5},
    { id: nextWadId++, name: "LostCivilisation.wad", rating:5},
    { id: nextWadId++, name: "btsx.wad", rating:5},
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
        res.status(400).send({error: "ID required"});
        return
    }
    const wadId = req.params.id ? 
        typeof req.params.id === "string" ?
            parseInt(req.params.id) 
            : parseInt(req.params.id[0]!)
        : null;
    const result = wads.filter(wad => wad.id === wadId)[0];
    if (result === undefined) {
        res.status(404).send({error: "WAD not found" });
        return 
    }
    res.send(result);
});

app.post("/wads", (req:Request, res: Response) => {
    const name = req.body?.name as string;
    const rating = req.body?.rating !== undefined ? parseInt(req.body.rating): undefined;
    if (!name) {
        res.status(400).send({ error: "Missing required parameter: 'name'" });
        console.log("name:", name);
        return
    }
    if (Number.isNaN(rating)) {
        res.status(400).send({ error: "Parameter 'rating' must be a number" });
        return;
    }

    const newWad = {
        id: nextWadId++,
        name: name,
        rating: rating
    }
    wads.push(newWad);
    res.status(201)
        .location(`http://localhost:${PORT}/wads/` + (newWad.id))
        .send(newWad);
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