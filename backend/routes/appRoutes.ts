//"meil on need tegevused ja seal controller-is"?
//nimetus võiks vastata tema funktsioonile
import WadsController from "../controllers/WadsController.ts";
import { Express } from "express";

export default (app: Express): void => {
    app.route("/wads")
    .get(WadsController.getAll)
    .post(WadsController.create);

    app.route("/wads:id")
    .get(WadsController.getByID)
    .delete(WadsController.deleteByID)
    .put(WadsController.modifyByID);
}