import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; //npm install uuid@latest

const WadsController = {
    async create(req: express.Request, res: express.Response) {
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
        const result = await db.wads.create({
            id: uuidv7(),
            WadName: req.body.WadName,
            WadDescription: req.body.WadDescription,
            ReleaseDate: req.body.ReleaseDate,
            CategoryID: req.body.CategoryID,
            ImageURL: req.body.ImageURL,
            Downloads: 0,
            Comments: req.body.Comments
        });
        
        return res
        .location(`${Utilities.getBaseURL(req)}/wads/
        ${result.id}`).sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response) {
        const wads = await db.wads.findAll();
        console.log("getAll: " + wads);
        return res
        .status(200)
        .send(
            wads.map(
                ({id, WadName}) => {return {id, WadName}}
            )
        )
    },
    async getByID(req: express.Request, res: express.Response) {
        let wadID: string = req.params.id as string;
        console.log(wadID);
        const wad = await db.wads.findByPk(wadID);
        if (!wad) {
            console.log("Wad not found");
            res.status(400).send(
                {
                    error: `Wad with ID ${wadID} not found.`
                }
            )
            return null;
        }
        console.log("Wad found");
        return res.status(200).send(wad);
    },
    async modifyByID(req: express.Request, res: express.Response) {
        const wadToBeModified = await this.getByID(req, res);
        if (!wadToBeModified) {
            return;
        }
        if (!req.body.WadName || 
            !req.body.WadDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID ||
            !req.body.ImageURL ||
            !req.body.Comments
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        }
        wadToBeModified.WadName = req.body.WadName;
        wadToBeModified.WadDescription = req.body.WadDescription;
        wadToBeModified.ReleaseDate = req.body.ReleaseDate;
        wadToBeModified.CategoryID = req.body.CategoryID;
        wadToBeModified.ImageURL = req.body.ImageURL;
        wadToBeModified.Comments = req.body.Comments;

        await wadToBeModified.save();
        return res.location(`${Utilities.getBaseURL(req)}/wads/
        ${wadToBeModified.id}`)
        .status(201)
        .send(wadToBeModified);
    },
    async deleteByID(req: express.Request, res: express.Response) {
        const wadToBeDeleted = await this.getByID(req, res);
        if (!wadToBeDeleted) {
            return;
        }
        await wadToBeDeleted.destroy(); //sequelize-i orm-i käsud
        return res.status(204)
        .send(
            {
                error: "No content."
            }
        );
    }
}

export default WadsController;