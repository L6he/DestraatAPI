//"meil on need tegevused ja seal controller-is"?
//nimetus võiks vastata tema funktsioonile
import { Express } from "express";
import WadsController from "../controllers/WadsController.ts";
import UsersController from "../controllers/UsersController.ts";

export default (app: Express): void => {
    app.route("/wads")
    .get(WadsController.getAll)
    .post(WadsController.create);

    app.route("/wads:id")
    .get(WadsController.getByID)
    .delete(WadsController.deleteByID)
    .put(WadsController.modifyByID);

    app.route("/users")
    .get(UsersController.getAll)
    .post(UsersController.create);

    app.route("/wads:id")
    .get(UsersController.getByID)
    .delete(UsersController.deleteByID)
    .put(UsersController.modifyByID);
}