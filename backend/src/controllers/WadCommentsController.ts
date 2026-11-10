import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import * as UUID from "node:crypto";
import type { WadComments } from "../models/WadComments.ts";

const WadCommentsController = {
    async create(req: express.Request, res: express.Response) 
{
    const userWhoUploaded = req.body.UserID; 
    const wadIdThatTheCommentisUploadedTo = req.body.WadID;

    if (!req.body.WadCommentsTitle || !userWhoUploaded || !wadIdThatTheCommentisUploadedTo) {
        return res.status(400).send({
            error: "Missing parameters, please review data."
        });
    }

    
    const result = await db.wadcomments.create({
        id: uuidv7(),
        WadCommentsTitle: req.body.WadCommentsTitle,
        WadCommentsContent: req.body.WadCommentsContent,
        UserID: userWhoUploaded, 
        WadID: wadIdThatTheCommentisUploadedTo, 
    });

    return res
        .location(`${Utilities.getBaseURL(req)}/wadcomments/${result.id}`)
        .sendStatus(201);
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
        const wadcomment = await WadCommentsController.getWadComment(req, res);
        if (!wadcomment) {
            return;
        }
        return res.status(200).send(wadcomment);
    },

    async modifyByID(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            return res.status(400).send(
                {
                    error:"Missing parameters, please review data."
                });
        }
        if (!req.body) {
            return res.status(400).send(
                {
                    error:"Missing parameters, please review data."
                });
        }

        const wadcommentToBeModified = await WadCommentsController.getWadComment(req, res);

        if (!wadcommentToBeModified) {
            return res.status(404).send(
                {
                    error:"WadComment not found with ID"+req.params.id
                });
        }

        const modifiedWadComment = {
            WadID: req.body.WadID,
            UserID: req.body.UserID,
            WadCommentsTitle: req.body.WadCommentsTitle,
            WadCommentsContent: req.body.WadCommentsContent
        } as WadComments;
        modifiedWadComment.updatedAt = new Date();

        await db.wadcomments.update(modifiedWadComment, {
            where:{
                id: req.params.id
            }
        });
        return res.location(`${Utilities.getBaseURL(req)}/wadcomments/${wadcommentToBeModified}`)
        .status(201).send(modifiedWadComment);
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
    },

    async getWadComment(req: express.Request, res: express.Response) {
        let wadcommentID: string = req.params.id as string;
        const wadcomment = await db.wadcomments.findByPk(wadcommentID);
        if (!wadcomment) {
            res.status(404).send({error:"Wadcomment not found with ID "+wadcommentID});
            return null;
        }
        return wadcomment;
    }
            
}
export default WadCommentsController;

