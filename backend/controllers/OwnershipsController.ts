import { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const OwnershipsController = {
    async create(req: Request, res: Response) {
        const userWhoUploaded = "UserID";
        const wadIdToBeAddedToOwnership = [ "WadID" ];
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
        const newOwnership = {
            id: uuidv7(),
            OwnershipName: req.body.OwnershipName,
            OwnershipDescription: req.body.OwnershipDescription,
            WadID: wadIdToBeAddedToOwnership,
            UserID: userWhoUploaded,
        }
        const addedOwnership = await db.ownerships.create(newOwnership);

        return res.location(`${Utilities.getBaseURL(req)}/ownerships/${addedOwnership.id}`).sendStatus(201);
    }
}