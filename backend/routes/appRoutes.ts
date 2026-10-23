//"meil on need tegevused ja seal controller-is"?
//nimetus võiks vastata tema funktsioonile
import express from "express";
import WadsController from "../controllers/WadsController.ts";
import UsersController from "../controllers/UsersController.ts";
import CredentialsController from "../controllers/CredentialsController.ts";
import OwnershipsController from "../controllers/OwnershipsController.ts";
import CommentsController from "../controllers/CommentsController.ts";

export default (app: express.Express): void => {
    app.route("/wads")
    .get(WadsController.getAll)
    .post(WadsController.create);

    app.route("/wads:id")
    .get(WadsController.getByID)
    .delete(WadsController.deleteByID)
    .put(WadsController.modifyByID);

    app.route("/users")
    //.get(UsersController.getAll)
    .post(UsersController.create);

    app.route("/users:id")
    //.get(UsersController.getByID)
    //.delete(UsersController.deleteByID)
    //.put(UsersController.modifyByID);

    //Credentials
    app.route("/credentials")
    .get(CredentialsController.getAll)
    .post(CredentialsController.create);

    app.route("/credentials:id")
    .get(CredentialsController.getByID)
    .delete(CredentialsController.deleteByID)
    .put(CredentialsController.modifyByID);

    //Ownerships
    app.route("/ownerships")
    //.get(OwnershipsController.getAll)
    .post(OwnershipsController.create);

    app.route("/ownerships:id")
    //.get(OwnershipsController.getByID)
    //.delete(OwnershipsController.deleteByID)
    //.put(OwnershipsController.modifyByID);

    //Comments
    app.route("/comments")
    .get(CommentsController.getAll)
    .post(CommentsController.create);

    app.route("/comments:id")
    .delete(CommentsController.remove)
    .patch(CommentsController.hide) //varem "/comments/:id/hide"
    .get(CommentsController.getByID);
}