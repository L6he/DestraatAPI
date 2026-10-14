import { Request, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7  as uuidv7 } from "uuid"; //npm install uuid@latest
import { error } from "console";

const UsersController = {
    async create(req: Request, res: Response) {
        if (!req.body.Title ||
            !req.body.Author ||
            !req.body.Content ||
            !req.body.DataAdded || ) {
            return res.status(400)
            .send(
                {
                    error:"Missing parameters, please review data."
                }
            );
            }
        const NewComment = {
            id: uuidv7(),
            Title: req.body.Title,
            Author: req.body.Author,
            Content: req.body.Content,
            DataAdded: Date.now(),
            
        }
        
    }
}