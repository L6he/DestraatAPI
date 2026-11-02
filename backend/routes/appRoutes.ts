//"meil on need tegevused ja seal controller-is"?
//nimetus võiks vastata tema funktsioonile
import express from "express";
import WadsController from "../controllers/WadsController.ts";
import UsersController from "../controllers/UsersController.ts";
import CredentialsController from "../controllers/CredentialsController.ts";
import OwnershipsController from "../controllers/OwnershipsController.ts";
import CommentsController from "../controllers/CommentsController.ts";
import WadCommentsController from "../controllers/WadCommentsController.ts";
import CategoriesController from "../controllers/CategoriesController.ts";
import checkRequestBody from "../controllers/middleware/checkRequestBody.ts";

export default (app: express.Express): void => {
    app.route("/wads")
    .get(WadsController.getAll)
    .post(checkRequestBody, WadsController.create);

    app.route("/wads/:id")
    .get(WadsController.getByID)
    .delete(WadsController.deleteByID)
    .put(checkRequestBody, WadsController.modifyByID);

    app.route("/users")
    .get(UsersController.getAll)
    .post(checkRequestBody, UsersController.create);

    app.route("/users/:id")
    .get(UsersController.getByID)
    .delete(UsersController.deleteByID)
    .put(checkRequestBody, UsersController.modifyByID);

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
    //.delete(CategoriesController.deleteByID)
    .put(checkRequestBody, CategoriesController.modifyByID);
}

