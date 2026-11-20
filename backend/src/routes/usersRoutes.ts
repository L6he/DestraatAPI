import express from "express";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";
import jwtAuth from "../controllers/middleware/jwtAuth.ts";
import UsersController from "../controllers/UsersController.ts";

const router = express.Router();

router.get("/", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'List of all Users',
        schema: [{ $ref: '#/definitions/UserListItem' }]    
    } */
   next();
}, jwtAuth, UsersController.getAll); 

router.post("/", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewUser' }
    } */
    /* #swagger.responses[201] = {
        description: 'User created',
        schema: { $ref: '#/definitions/User' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, checkRequestBody, UsersController.create);

router.get("/:id", (req, res, next) => {
    /* #swagger.responses[200] = {
        description: 'User details',
        schema: { $ref: '#/definitions/User' }
    } */
    /* #swagger.responses[404] = {
        description: 'User not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, jwtAuth, UsersController.getByID);

router.put("/:id", (req, res, next) => {
    /* #swagger.parameters['body'] = {
        in: 'body',
        required: true,
        schema: { $ref: '#/definitions/NewUser' }
    } */
    /* #swagger.responses[200] = {
        description: 'User updated',
        schema: { $ref: '#/definitions/User' }
    } */
    /* #swagger.responses[400] = {
        description: 'Invalid request body',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    /* #swagger.responses[404] = {
        description: 'User not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, jwtAuth, checkRequestBody, UsersController.modifyByID);

router.delete("/:id",(req, res, next) => {
    /* #swagger.responses[204] = {
        description: 'User deleted'
    } */
    /* #swagger.responses[404] = {
        description: 'User not found',
        schema: { $ref: '#/definitions/ErrorResponse' }
    } */
    next();
}, jwtAuth, UsersController.deleteByID);

export default router;
