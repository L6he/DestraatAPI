import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import type { Credential } from "../models/Credential.ts";

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
        const credential = await CredentialsController.getCredential(req, res);
        if (!credential) {
            return;
        }
        return res.status(200).send(credential);
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
        if (!req.params.id) {
            return res.status(400).send(
                {
                    error:"Missing parameters, please review data."
                });
        }
        if (!req.body) {
            return res.status(400).send(
                {
                    error:"Missing parameters, please review data."
                });
        }

        const credentialToBeModified = await CredentialsController.getCredential(req, res);

        if (!credentialToBeModified) {
            return res.status(404).send(
                {
                    error:"Credential not found with ID"+req.params.id
                });
        }

        const modifiedCredential = {
            UserType: req.body.UserType,
            UserID: req.body.UserID,
            Credentials: req.body.Credentials,
            createdAt: req.body.createdAt
        } as Credential;
        modifiedCredential.updatedAt = new Date();

        await db.credentials.update(modifiedCredential, {
            where:{
                id: req.params.id
            }
        });
        return res.location(`${Utilities.getBaseURL(req)}/credentials/${credentialToBeModified}`)
        .status(201).send(modifiedCredential);
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

    async getCredential(req: express.Request, res: express.Response) {
        let credentialID: string = req.params.id as string;
        const credential = await db.credentials.findByPk(credentialID);
        if (!credential) {
            res.status(404).send({error:"Credential not found with ID"+credentialID});
            return null;
        }
        return credential;
    }
}

export default CredentialsController;