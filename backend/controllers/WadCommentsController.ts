import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import * as UUID from "node:crypto";

const WadCommentsController = {
    async create(req: express.Request, res: express.Response) 
    {
        const userWhoUploaded = "UserID";
        const wadIdThatTheCommentisUploadedTo = "WadID";
        /*check if req body has a user id
        if not, use status code 403 Unauthorized
        else, add into object to be created*/
        if (!req.body.WadCommentsTitle
            || !req.body.WadID
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data."
                }
            );
        }
        const result = await db.wadcomments.create({
            id: uuidv7(),
            WadCommentsTitle: req.body.WadCommentsTitle,
            WadCommentsContent: req.body.WadCommentsContent,
            UserID: userWhoUploaded, //later  get real user id
            WadID: wadIdThatTheCommentisUploadedTo,
        });
        return res
        .location(`${Utilities.getBaseURL(req)}/wadcomments/
        ${result.id}`).sendStatus(201);
    },

    async getAll(req: express.Request, res: express.Response) {
        const wadcomments = await db.wadcomments.findAll();
        console.log("getAll: " + wadcomments);
        return res
        .status(200)
        .send(
            wadcomments.map(
                ({id, WadCommentsTitle}) => {return {id, WadCommentsTitle}}
            )
        )
    },

    async getByID(req: express.Request, res: express.Response) {
        let wadcommentsID: string = req.params.id as string;
        console.log(wadcommentsID);
        const wadcomment = await db.wadcomments.findByPk(wadcommentsID);
        if (!wadcomment) {
            res.status(400).send(
                {
                    error: `Wad comment with ID ${wadcommentsID} not found.`
                }
            )
            return null;
        }
        return wadcomment;
    },

    async modifyByID(req: express.Request, res: express.Response) {
        const wadCommentToBeModified = await this.getByID(req, res);
        if (!wadCommentToBeModified) {
            return;
        }
        if 
            (
                !req.body.WadCommentsTitle || 
                !req.body.WadCommentsContent ||
                !req.body.WadID ||
                !req.body.UserID
            ) 
        {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        }
        wadCommentToBeModified.WadCommentsTitle = req.body.WadCommentsTitle;
        wadCommentToBeModified.WadCommentsContent = req.body.WadCommentsContent;
        wadCommentToBeModified.WadID = req.body.WadID;
        wadCommentToBeModified.UserID = req.body.UserID;

        await wadCommentToBeModified.save();
        return res.location(`${Utilities.getBaseURL(req)}/wadcomments/
        ${wadCommentToBeModified.id}`)
        .status(201)
        .send(wadCommentToBeModified);
    },
    
    async deleteByID(req: express.Request, res: express.Response) {
        const wadCommentToBeDeleted = await this.getByID(req, res);
        if (!wadCommentToBeDeleted) {
            return;
        }
        await wadCommentToBeDeleted.destroy();
        return res.status(204)
        .send(
            {
                error: "No content."
            }
        );
    }
            
}
export default WadCommentsController;

