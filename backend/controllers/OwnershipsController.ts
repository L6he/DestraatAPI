import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import * as UUID from "node:crypto";

const OwnershipsController = {
    async create(req: express.Request, res: express.Response) {
        const userWhoUploaded = "UserID";
        const wadIdToBeAddedToOwnership = JSON.parse(["a", "b"].join(","));
        /*check if req body has a user id
        if not, use status code 403 Unauthorized
        else, add into object to be created*/
        if (!req.body.OwnershipName
            || !req.body.WadID
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data."
                }
            );
        }
        const result = await db.ownerships.create({
            id: uuidv7(),
            OwnershipName: req.body.OwnershipName,
            OwnershipDescription: req.body.OwnershipDescription,
            WadID: wadIdToBeAddedToOwnership,
            UserID: userWhoUploaded,
        });

        return res.location(`${Utilities.getBaseURL(req)}/ownerships/${result.id}`).sendStatus(201);
    }
}

export default OwnershipsController;