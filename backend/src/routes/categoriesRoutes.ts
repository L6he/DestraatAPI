import express from "express";
import CategoriesController from "../controllers/CategoriesController.ts";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";

const router = express.Router();

router.get("/", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'List of all Categories',
        schema: [{ $ref: '#/definitions/CategoryListItem' }]    
    } */
   next();
}, CategoriesController.getAll);

router.post("/", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewCategory' }
    } */
    /* #swagger.responses[201] = {
        description: 'Category created',
        schema: { $ref: '#/definitions/Category' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkRequestBody, CategoriesController.create);

router.get("/:id", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'Category details',
        schema: { $ref: '#/definitions/Category' }
    } */
    /* #swagger.responses[404] = {
        description: 'Category not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, CategoriesController.getByID);

router.put("/:id", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewCategory' }
    } */
    /* #swagger.responses[200] = {
        description: 'Category updated',
        schema: { $ref: '#/definitions/Category' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    /* #swagger.responses[404] = {
        description: 'Category not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkRequestBody, CategoriesController.modifyByID);

router.delete("/:id",(req, res, next) => {
    /* #swagger.responses[204] = {
        description: 'Category deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Category not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, CategoriesController.deleteByID);

export default router;