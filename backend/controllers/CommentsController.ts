import { Request, Response } from "express";
import { db } from "../db.ts";
import { v7 as uuidv7 } from "uuid";

const CommentsController = {
    async create(req: Request, res: Response) {
        if (!req.body.CommentContent || !req.body.CommentDate) {
            return res.status(400).send({
                error: "Missing parameters, please review data."
            });
        }
            
        try {
            const newComment = await db.Comment.create({
                CommentID: uuidv7(),
                CommentContent: req.body.CommentContent,
                CommentListID: req.body.CommentListID || null,
                CommentDate: req.body.CommentDate,
                CommentRepliesID: req.body.CommentRepliesID || null,
                WadID: req.body.WadID || null,
                UserID: req.body.UserID || null
            });
            
            return res.status(201).send({
                message: "Comment created successfully",
                data: newComment
            });
        } catch (error) {
            console.error("Error creating comment:", error);
            return res.status(500).send({
                error: "An error occurred while creating the comment."
            });
        }
    }
};

export default CommentsController;