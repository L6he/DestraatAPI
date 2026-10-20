import { Request, response, Response } from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";

const CredentialsController = {
    async create(req: Request, res: Response) {
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

        const newCredential = {
            id: uuidv7(),
            UserID: req.body.UserID,
            Credentials: req.body.Credentials,
            UserType: req.body.UserType
        }

        const addedCredential = await db.credentials.create(newCredential);

        return res
        .location(`${Utilities.getBaseURL(req)}/credentials/
        ${addedCredential.id}`).sendStatus(201);
    },
    
    async getByID(req: Request, res: Response) {
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

    async getAll(req: Request, res: Response) {
        const credentials = await db.credentials.findAll();
        console.log("getAll: " + credentials);
        return res.status(200)
        .send(
            credentials.map(
                ({Id, UserType}) => {return {Id, UserType}} //Id or id?
            )
        );
    },

    async modifyByID(req: Request, res: Response) {
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
}

export default CredentialsController;