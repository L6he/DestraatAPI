import { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; //npm install uuid@latest
import { error } from "console";

const WadsController = {
    async create(req: Request, res: Response) {
        if (!req.body.WadName || 
            !req.body.WadDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        }
        const newWad = {
            id: uuidv7(),
            WadName: req.body.WadName,
            WadDescription: req.body.WadDescription,
            ReleaseDate: req.body.ReleaseDate,
            CategoryID: req.body.CategoryID,
            ImageURL: req.body.ImageURL,
            Downloads: 0,
            Comments: req.body.Comments
        }
        const createdWad = await db.wads.create(newWad);
        
        return res
        .location(`${Utilities.getBaseURL(req)}/wads/
        ${createdWad.id}`).sendStatus(201);
    }
}

export default WadsController;