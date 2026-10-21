import { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; //npm install uuid@latest

const WadCommentsController = {
    async create(req: Request, res: Response) {
        const userWhoUploaded = "userid"
        const wadIdThatTheCommentisUploadedTo = "wadid"

        if (!req.body.WadCommentsName
            || !req.body.WadId
        ){
            return res.status(400).send(
                {
                    error: "Missing parameters, pleae review data"
                }
            )
        }
        const newWadComment = {
            id: uuidv7(),
            WadCommentsName: req.body.WadCommentsName,
            WadCommentsDescription: req.body.WadCommentsDescription,
            UserId: userWhoUploaded, //later  get real user id
            WadId: wadIdThatTheCommentisUploadedTo //later get real wad id
        }
        const addedWadComments = await db.wadComments.create(newWadComment)

        return res.location(`${Utilities.getBaseURL(req)} / wadComments/${addedWadComments.id}`).sendStatus(201)
    }
}

export default WadCommentsController