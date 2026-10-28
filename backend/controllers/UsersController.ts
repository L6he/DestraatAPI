import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid"; //npm install uuid@latest
import { User } from "../models/User.ts";

const UsersController = {
    async create(req: express.Request, res: express.Response) {
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
        if (req.body.Password !== req.body.PasswordConfirmation) {
            return res.status(406)
            .send(
                {
                    error: "Passwords do not match, please check your info."
                }
            );
        }
        const passwordHash = await Utilities.gimmePassword(req.body.Password);

        const result = await db.users.create({
            id: uuidv7(),
            UserName: req.body.UserName,
            EmailAddress: req.body.EmailAddress,
            UserStatus: "unverified",
            PasswordHash: passwordHash
        });

        return res.location(`${Utilities.getBaseURL(req)}/users/${result.id}`)
        .sendStatus(201);
    },
    async modifyByID(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            return res.status(400).send({
                error: "Missing parameters, please review data"
            })
        }
        const userToBeModified = await UsersController.getUser(req, res) as User;
        if (!req.body) {
            return res.status(400).send({
                error: "Missing parameters, please review data"
            })
        }
        const modifiedUser = new User

        modifiedUser.UserName = userToBeModified.UserName
        modifiedUser.PasswordHash = userToBeModified.PasswordHash
        modifiedUser.SignupDate = userToBeModified.SignupDate
        modifiedUser.UserStatus = userToBeModified.UserStatus
        modifiedUser.EmailAddress = userToBeModified.EmailAddress
        modifiedUser.OwnershipID = userToBeModified.OwnershipID
        modifiedUser.CommentListID = userToBeModified.CommentListID
        modifiedUser.ProfileID = userToBeModified.ProfileID
        modifiedUser.CredentialID = userToBeModified.CredentialID
        modifiedUser.createdAt = userToBeModified.createdAt

        if (req.body.UserName) {
            modifiedUser.UserName = req.body.UserName;
        }
        if (req.body.Password) {
            //kontrolli olemasoleva paswordi hashide samasust
            if (req.body.Password != req.body.PasswordConfirmation) 
            {
            return res.status(406)
            .send({error:"Passwords do not match, please check your info."})            
            } else {
                const passwordHash = await Utilities.gimmePassword(req.body.Password)
            }
            //kui ok, siis proceed
            //hashi uus password
        }
        if (req.body.UserStatus) {
            modifiedUser.UserStatus = req.body.UserStatus;
        }
        if (req.body.OwnershipID) {
            modifiedUser.OwnershipID = req.body.OwnershipID;
        }
        if (req.body.CommentListID) {
            modifiedUser.CommentListID = req.body.CommentListID;
        }
        if (req.body.ProfileID) {
            modifiedUser.ProfileID = req.body.ProfileID;
        }
        if (req.body.EmailAddress) {
            modifiedUser.EmailAddress = req.body.EmailAddress;
        }
        if (req.body.CredentialID) {
            modifiedUser.CredentialID = req.body.CredentialID;
        }
        modifiedUser.updatedAt = new Date();
        await db.users.update(modifiedUser, { where: {id: req.params.id}});

        return res.location(`${Utilities.getBaseURL(req)}/users/
        ${userToBeModified}`)
        .status(201)
        .send(modifiedUser);
    },
    async getAll(req: express.Request, res: express.Response) {
        const users = await db.users.findAll();
        console.log("getAll"+users);
        return res.status(200).send(users.map(
            ({id, UserName, UserStatus, EmailAddress }) => {return {id, UserName, UserStatus, EmailAddress}}
        ));
    },
    async getByID(req: express.Request, res: express.Response) {
        const user = await UsersController.getUser(req, res);
        if (!user) {
            return;
        }
        return res.status(200).send(user);
    },
    async deleteByID(req: express.Request, res: express.Response) {
        const userToBeDeleted = await UsersController.getUser(req, res);
        if (!userToBeDeleted) {
            return;     
        }
        await userToBeDeleted.destroy();
        return res.status(204).send(
            {
                error: "No Content"
            }
        );
    },
    async getUser(req: express.Request, res: express.Response) {
        let userID: string = req.params.id as string;
        console.log(userID);
        const user = await db.users.findByPk(userID);
        if (!user) {
            console.log("User not found");
            res.status(404).send({
                error: "User not found with ID " + userID
            });
            return null;
        }
        return user;
    }
}

export default UsersController;