import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import type { Ownership } from "../models/Ownership.ts";

const OwnershipsController = {
    async getOwnership(req: express.Request, res: express.Response) {
        let ownershipID: string = req.params.id as string;
        const ownership = await db.ownerships.findByPk(ownershipID);
        if (!ownership) {
            res.status(404).send({ error: "Ownership not found with ID " + ownershipID });
            return null;
        }
        return ownership;
    }
};

export default OwnershipsController;

async create(req: express.Request, res: express.Response) {
        if (
            !req.body.OwnershipName ||
            !req.body.WadIDs ||
            !req.body.UserID
        ) {
            if (!req.body.UserID) {
                return res.status(403).send({ error: "Unauthorized" });
            }
            return res.status(400).send({
                error: "Missing parameters, please review data."
            });
        }
        
        const starterJson = `{"WadIDs":"${req.body.WadIDs}"}`;
        const wadIdToBeAddedToOwnership = JSON.parse(starterJson);

        const result = await db.ownerships.create({
            id: uuidv7(),
            OwnershipName: req.body.OwnershipName,
            OwnershipDescription: req.body.OwnershipDescription,
            WadIDs: wadIdToBeAddedToOwnership,
            UserID: req.body.UserID,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.location(`${Utilities.getBaseURL(req)}/ownerships/${result.id}`).sendStatus(201);
    },
    
async deleteByID(req: express.Request, res: express.Response) {
        const ownershipToBeDeleted = await OwnershipsController.getOwnership(req, res);
        if (!ownershipToBeDeleted) {
            return;
        }
        await ownershipToBeDeleted.destroy();
        return res.status(204).send({
            error: "No content."
        });
    },
