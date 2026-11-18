//"meil on need tegevused ja seal controller-is"?
//nimetus võiks vastata tema funktsioonile
import express from "express";
import wadsRoutes from "./wadsRoutes.ts";
import usersRoutes from "./usersRoutes.ts";
import CredentialsController from "../controllers/CredentialsController.ts";
import OwnershipsController from "../controllers/OwnershipsController.ts";
import CommentsController from "../controllers/CommentsController.ts";
import WadCommentsController from "../controllers/WadCommentsController.ts";
import CategoriesController from "../controllers/CategoriesController.ts";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";

export default (app: express.Express): void => {
    
    // Globaalne 500 vastus kõigile allolevatele otspunktidele
    app.use((req, res, next) => {
        /* #swagger.responses[500] = { 
            description: 'Internal Server Error' 
        } */
        next();
    });

    //WADs
    app.use("/wads", (req, res, next) => {
        // #swagger.tags = ['WADs']
        next();
    }, wadsRoutes);

    //Users
    app.use("/users", (req, res, next) => {
        // #swagger.tags = ['Users']
        next();
    }, usersRoutes);

    //Credentials
    app.route("/credentials")
        .get(CredentialsController.getAll)
        .post(checkRequestBody, CredentialsController.create);

    app.route("/credentials/:id")
        .get(CredentialsController.getByID)
        .delete(CredentialsController.deleteByID)
        .put(checkRequestBody, CredentialsController.modifyByID);

    //Ownerships
    app.route("/ownerships")
        .get(OwnershipsController.getAll)
        .post(checkRequestBody, OwnershipsController.create);

    app.route("/ownerships/:id")
        .get(OwnershipsController.getByID)
        .delete(OwnershipsController.deleteByID)
        .put(checkRequestBody, OwnershipsController.modifyByID);

    //Comments
    app.route("/comments")
        .get(CommentsController.getAll)
        .post(checkRequestBody, CommentsController.create);

    app.route("/comments/:id")
        .delete(CommentsController.remove)
        .patch(checkRequestBody, CommentsController.hide) //varem "/comments/:id/hide"
        .get(CommentsController.getByID);

    //WadComments
    app.route("/wadcomments")
        .post(checkRequestBody, WadCommentsController.create)
        .get(WadCommentsController.getAll);

    app.route("/wadcomments/:id")
        .get(WadCommentsController.getByID)
        .put(checkRequestBody, WadCommentsController.modifyByID)
        .delete(WadCommentsController.deleteByID);

    //Categories
    app.route("/categories")
        .get(CategoriesController.getAll)
        .post(checkRequestBody, CategoriesController.create);

    app.route("/categories/:id")
        .get(CategoriesController.getByID)
        .delete(CategoriesController.deleteByID)
        .put(checkRequestBody, CategoriesController.modifyByID);
}
