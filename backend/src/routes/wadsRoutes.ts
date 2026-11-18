import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";
import WadsController from "../controllers/WadsController.ts";

const router = express.Router();

router.get("/", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'List of all WADs',
        schema: [{ $ref: '#/definitions/WadListItem' }]    
    } */
   next();
}, WadsController.getAll);

router.post("/", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewWad' }
    } */
    /* #swagger.responses[201] = {
        description: 'Wad created',
        schema: { $ref: '#/definitions/Wad' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkRequestBody, WadsController.create);

router.get("/:id", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'Wad details',
        schema: { $ref: '#/definitions/Wad' }
    } */
    /* #swagger.responses[404] = {
        description: 'Wad not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, WadsController.getByID);

router.put("/:id", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewWad' }
    } */
    /* #swagger.responses[200] = {
        description: 'Wad updated',
        schema: { $ref: '#/definitions/Wad' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    /* #swagger.responses[404] = {
        description: 'Wad not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkRequestBody, WadsController.modifyByID);

router.delete("/:id",(req, res, next) => {
    /* #swagger.responses[204] = {
        description: 'Wad deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'Wad not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, WadsController.deleteByID);

export default router;