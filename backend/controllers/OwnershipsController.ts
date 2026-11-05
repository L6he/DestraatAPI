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