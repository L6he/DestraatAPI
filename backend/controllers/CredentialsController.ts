import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const CredentialsController = {
    async create(req: express.Request, res: express.Response) {
        if (!req.body.UserID || 
            !req.body.Credentials ||
            !req.body.UserType
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        }

        const result = await db.credentials.create({
            id: uuidv7(),
            UserID: req.body.UserID,
            Credentials: req.body.Credentials,
            UserType: req.body.UserType
        });

        return res
        .location(`${Utilities.getBaseURL(req)}/credentials/
        ${result.id}`).sendStatus(201);
    },
    
    async getByID(req: express.Request, res: express.Response) {
        let credentialID: String = req.params.id as String //lack of capitalisation here on id may be problematic
        console.log(credentialID); //VERY SECURE
        const credential = await db.credentials.findByPk(credentialID);
        if (!credential) {
            res.status(404).send(
                {
                    error: `Credential with id ${credentialID} not found.`
                }
            )
            return null;
        }
        return credential;
    },

    async getAll(req: express.Request, res: express.Response) {
        const credentials = await db.credentials.findAll();
        console.log("getAll: " + credentials);
        return res.status(200)
        .send(
            credentials.map(
                ({id, UserType}) => {return {id, UserType}} //Id or id?
            )
        );
    },

    async modifyByID(req: express.Request, res: express.Response) {
        const credentialToBeModified = await this.getByID(req, res);
        if (!credentialToBeModified) {
            return res.status(404).send(
                {
                    error: "Credential with this ID not found"
                }
            );
        }
        if (!req.body.UserID || 
            !req.body.Credentials ||
            !req.body.UserType
        ) {
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data"
                }
            );
        }
        credentialToBeModified.UserID = req.body.UserID;
        credentialToBeModified.Credentials = req.body.Credentials;
        credentialToBeModified.UserType = req.body.UserType;

        await credentialToBeModified.save();
        return res.location(`${Utilities.getBaseURL(req)}/credentials/
        ${credentialToBeModified.id}`)
        .status(201)
        .send(credentialToBeModified);
    },

    async deleteByID(req: express.Request, res: express.Response) {
        const credentialToBeDeleted = await this.getByID(req, res);
        if (!credentialToBeDeleted) {
            return res.status(404).send(
                {
                    error: "Credential with this ID not found."
                }
            );
        }
        await credentialToBeDeleted.destroy();
        return res.status(204).send(
            {
                error: "No content."
            }
        );
    },
}

export default CredentialsController;