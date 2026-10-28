import express from "express";
import { db } from "../db.ts";
import Utilities from "./Utilities.ts";
import { v7 as uuidv7 } from "uuid";
import * as UUID from "node:crypto";
import type { Ownership } from "../models/Ownership.ts";

const OwnershipsController = {
    async create(req: express.Request, res: express.Response) {
        /*check if req body has a user id
        if not, use status code 403 Unauthorized
        else, add into object to be created*/
        if (!req.body.OwnershipName
            || !req.body.WadIDs
            || !req.body.UserID
        ) {
            if (!req.body.UserID) {
                return res.status(403).send({error:"Unauthorized"});
            }
            return res.status(400).send(
                {
                    error: "Missing parameters, please review data."
                }
            );
        }
        const starterJson = `{"WadIDs":"${req.body.WadIDs}"}`
        const wadIdToBeAddedToOwnership = JSON.parse(starterJson)

        const result = await db.ownerships.create({
            id: uuidv7(),
            OwnershipName: req.body.OwnershipName,
            OwnershipDescription: req.body.OwnershipDescription,
            WadIDs: wadIdToBeAddedToOwnership,
            UserID: req.body.UserID,
            createdAt: new Date(),
            updatedAt: new Date()
        });

        return res.location(`${Utilities.getBaseURL(req)}/ownerships/${result.id}`).sendStatus(201);
    },
    async modifyByID(req: express.Request, res: express.Response) {
        if (!req.params.id) {
            console.log(req.params.id)
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

        const ownershipToBeModified = await OwnershipsController.getOwnership(req, res)

        if (!ownershipToBeModified) {
            return res.status(404).send(
                {
                    error:"Ownership not found with ID "+req.params.id
                });
        }

        const modifiedOwnership = {
            OwnershipName: req.body.OwnershipName,
            OwnershipDescription: req.body.OwnershipDescription,
            WadIDs: req.body.WadIDs,
            UserID: req.body.UserID,
            createdAt: req.body.createdAt,
        } as Ownership
        modifiedOwnership.updatedAt = new Date()

        await db.ownerships.update(modifiedOwnership, {
            where:{
                id: req.params.id
            }
        })
        return res.location(`${Utilities.getBaseURL(req)}/ownerships/${ownershipToBeModified}`)
        .status(201).send(modifiedOwnership);
    },
    async getAll(req: express.Request, res: express.Response) {
        const ownerships = await db.ownerships.findAll();
        console.log("getAll: " + ownerships);
        return res.status(200)
            .send(ownerships.map(
                ({id, UserID}) => {return {id, UserID}}
            ));
    },
    async getByID(req: express.Request, res: express.Response) {
        const ownership = await OwnershipsController.getOwnership(req, res)
        if (!ownership) {
            return;        
        }
        return res.status(200).send(ownership);
    },
    async deleteByID(req: express.Request, res: express.Response) {
        const ownershipToBeDeleted = await OwnershipsController.getOwnership(req, res);
        if (!ownershipToBeDeleted) {
            return;
        }
        await ownershipToBeDeleted.destroy();
        return res.status(204).send({
            error: "No content."
        });
    },
    async getOwnership(req: express.Request, res: express.Response) {
        let ownershipID: string = req.params.id as string
        const ownership = await db.ownerships.findByPk(ownershipID)
        if (!ownership) {
            res.status(404).send({error:"Ownership not found with ID "+ownershipID})
            return null;
        }
        return ownership;
    }
}

export default OwnershipsController;