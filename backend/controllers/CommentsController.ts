import express from "express";
import { db } from "../db.ts";
import { v7 as uuidv7 } from "uuid";

const CommentsController = {
    async getAll(req: express.Request, res: express.Response) {
        try {
            const comments = await db.comments.findAll();
            
            const formattedComments = comments.map((comment: any) => ({
                name: comment.Author,
                txt: comment.CommentContent
            }));

            return res.status(200).json(formattedComments);
        } catch (error) {
            console.error("Error fetching comments:", error);
            return res.status(500).send({
                error: "An error occurred while fetching comments."
            });
        }
    },

    async getByID(req: express.Request, res: express.Response) {
        const commentId = req.params.id;

        if (!commentId) {
            return res.status(400).send({
                error: "Missing comment ID."
            });
        }

        try {
            const comment = await db.comments.findByPk(commentId);

            if (!comment) {
                return res.status(404).send({
                    error: "Comment not found."
                });
            }

            return res.status(200).json(comment);
        } catch (error) {
            console.error("Error fetching comment details:", error);
            return res.status(500).send({
                error: "An error occurred while fetching comment details."
            });
        }
    },

    async create(req: express.Request, res: express.Response) {
        if (
            !req.body.CommentTitle ||
            !req.body.Author ||
            !req.body.CommentContent ||
            !req.body.CommentDate
        ) {
            return res.status(400).send({
                error: "Missing parameters, please review data."
            });
        }

        try {
            const newComment = await db.comments.create({ 
                id: uuidv7(),
                CommentTitle: req.body.CommentTitle,
                Author: req.body.Author,
                CommentContent: req.body.CommentContent,
                CommentDate: req.body.CommentDate,
                CommentListID: req.body.CommentListID || null,
                CommentsID: req.body.CommentsID || null,
                CommentLikes: req.body.CommentLikes || 0,
                CommentStatus: req.body.CommentStatus || "active",
                CommentedWAD: req.body.CommentedWAD || null
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
    },

    async remove(req: express.Request, res: express.Response) {
        const commentToBeDeleted = await this.getByID(req, res);
        if (!commentToBeDeleted) {
            return;
        }

            await commentToBeDeleted.destroy();

            return res.status(204).send(
                {
                error: "No content."
                }
            );
    },

    async hide(req: express.Request, res: express.Response) {
        const commentId = req.params.id;

        if (!commentId) {
            return res.status(400).send({
                error: "Missing comment ID."
            });
        }

        try {
            const comment = await db.comments.findByPk(commentId);

            if (!comment) {
                return res.status(404).send({
                    error: "Comment not found."
                });
            }

            comment.CommentStatus = "hidden";
            await comment.save();

            return res.status(201).send({
                message: "Comment hidden successfully",
                data: comment
            });
        } catch (error) {
            console.error("Error hiding comment:", error);
            return res.status(500).send({
                error: "An error occurred while hiding the comment."
            });
        }
    }
};

export default CommentsController;