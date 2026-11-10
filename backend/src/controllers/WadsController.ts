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
                    error: "Missing at least one of these parameters: WadName, WadDescription, ReleaseDate, CategoryID. Please review data."
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
        const wad = await WadsController.getWad(req, res);
        if (!wad) {
            console.log("Wad not found");
            return;
        }
        console.log("Wad found")
        return res.status(200).send(wad);
    },
    async modifyByID(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            console.log(req.params.id);
            return res.status(400).send({"error":"Missing parameters, please review data"});
        }
        console.log(req.params.id);
        const wadToBeModified = await WadsController.getWad(req, res);
        console.log(wadToBeModified);
        if (!wadToBeModified) {
            console.log("Wad not found");
            return res.status(404).send(
                {
                    error: "Wad not found with ID " + wadToBeModified
                }
            );
        }
        if (!req.body.WadName || 
            !req.body.WadDescription ||
            !req.body.ReleaseDate ||
            !req.body.CategoryID
        ) {
            console.log(req.body.WadName+" "+req.body.WadDescription+" "+req.body.ReleaseDate+" "+req.body.CategoryID)
            return res.status(400).send(
                {
                    error: "Missing at least one of these parameters: WadName, WadDescription, ReleaseDate, CategoryID. Please review data."
                }
            );
        }
        const modifiedWad = {
            WadName: req.body.WadName,
            WadDescription: req.body.WadDescription,
            ReleaseDate: req.body.ReleaseDate,
            CategoryID: req.body.CategoryID,
            ImageURL: req.body.ImageURL || null,
            Comments: req.body.Comments || null,
            updatedAt: new Date(),
        }

        console.log("---");
        console.log(modifiedWad);
        console.log("---");

        await db.wads.update(modifiedWad, { where: {id: req.params.id}});

        return res.location(`${Utilities.getBaseURL(req)}/wads/
        ${wadToBeModified}`)
        .status(201)
        .send(modifiedWad);
    },
    async deleteByID(req: express.Request, res: express.Response) {
        const wadToBeDeleted = await WadsController.getWad(req, res);
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
    },
    async getWad(req: express.Request, res: express.Response) {
        let wadID: string = req.params.id as string;
        console.log(wadID);
        const wad = await db.wads.findByPk(wadID);
        if (!wad) {
            console.log("Wad not found");
            res.status(404).send({
                error: `Wad not found with this ID: ${wadID}` 
            });
            return null;
        }
        return wad;
    }
}

export default WadsController;