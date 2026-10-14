import { Request, Response} from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; //npm install uuid@latest
import { error } from "console";

const UsersController = {
    async create(req: Request, res: Response) {
        if (!req.body.UserName || 
            !req.body.EmailAddress ||
            !req.body.Password ||
            !req.body.PasswordConfirmation) {
            return res.status(400)
            .send(
                {
                    error: "Missing parameters, please review data."
                }
            );
        }
        if (!req.body.Password != req.body.PasswordConfirmation) {
            return res.status(406)
            .send(
                {
                    error: "Passwords do not match, please check your info."
                }
            );
        }
        const newUser = {
            id: uuidv7(),
            UserName: req.body.UserName,
            EmailAddress: req.body.EmailAddress,
            SignupDate: Date.now(),
            UserStatus: "unverified",
            PasswordHASH: "",
        }
        newUser.PasswordHASH = await Utilities.gimmePassword(req.body.Password); //cast?

        const result = await db.users.create(newUser);

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`)
        .sendStatus(201);
    }
}

export default UsersController;