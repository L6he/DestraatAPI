import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; 

const CategoriesController = {
    async create(req: express.Request, res: express.Response) {
        if (!req.body.CategoryName ||
            !req.body.CategoryDescription
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data."
                }
            );
        }
        const result = await db.categories.create({
            id: uuidv7(),
            CategoryName: req.body.CategoryName,
            CategoryDescription: req.body.CategoryDescription
        });

        return res.location(`${Utilities.getBaseURL(req)}/categories/${result.id}`)
        .sendStatus(201);
    },
    async getAll(req: express.Request, res: express.Response) {
            const categories = await db.categories.findAll();
            console.log("getAll: " + categories);
            return res.status(200)
                .send(categories.map(
                    ({id, CategoryName, CategoryDescription}) => {return {id, CategoryName, CategoryDescription}}
                ));
    },
    async getByID(req: express.Request, res: express.Response) {
            const category = await CategoriesController.getCategory(req, res)
            if (!category) {
                return;        
            }
            return res.status(200).send(category);
        },
    
}

export default CategoriesController;