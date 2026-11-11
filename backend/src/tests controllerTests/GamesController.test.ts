import { describe, it, expect, vi, test, beforeEach} from "vitest";
import type {Request, Response} from "express";
import {v7 as uuidv7 } from "uuid";

const mocks = vi.hoisted(() => ({
    findAll: vi.fn(),
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
}))

vi.mock("../db.ts", () => ({
    db: {
        wads: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update
        }
    }
}))

import _WadsController from "../../src/controllers/WadsController.ts"
import { Wad } from "../models/Wad.ts";
import WadsController from "../../src/controllers/WadsController.ts";
import { except } from "drizzle-orm/gel-core";

describe("WadsController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    })
    test("Return_AllWads_With200Status", async () => {
        mocks.findAll.mockResolvedValue(
            [
                {id: "e893c616-f83b-48b6-8bb0-f8a80ba538f7",
                    WadName:"vi-wad-test1"},
                {id: "f31d3f7f-f0d7-4009-a  701-ed2391d1183a",
                    WadName:"vi-wad-test2"},
                {id: "12efab20-add0-4b69-be3f-0938e902963f",
                    WadName:"vi-wad-test3"}
            ]
        )
        const req = {} as Request
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        await _WadsController.getAll(req, res);

        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {id: "e893c616-f83b-48b6-8bb0-f8a80ba538f7",
                WadName:"vi-wad-test1"},
            {id: "f31d3f7f-f0d7-4009-a  701-ed2391d1183a",
                WadName:"vi-wad-test2"},
            {id: "12efab20-add0-4b69-be3f-0938e902963f",
                WadName:"vi-wad-test3"}
        ])
    })

    test("Return_OneWadById_With200Status", async() =>{
        const wad = {
            id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7",
            WadName:"vi-wad-test1",
            WadDescription:"vi-wad-test1",
            ReleaseDate: new Date(),
            CategoryID: "lamp",
            ImageURL: null,
            Downloads: 0,
            Comments: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const req = {
            params: {
                id: wad.id
            }
        } as unknown as Request
       
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response
        mocks.findByPk.mockResolvedValue(wad)

        await _WadsController.getByID(req, res)

        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith
        (wad.id)
        expect(res.status).toHaveBeenCalledWith(200)
        expect(res.send).toHaveBeenCalledWith(wad)
    })

    test("Return_CreatedGame_With201Status", async () =>{
        const id = "f31d3f7f-f0d7-4009-a  701-ed2391d1183a"
        mocks.create.mockResolvedValue({ id: id})
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            body: {
                WadName:"vi-wad-test3",
                WadDescription:"vi-wad-test3",
                ReleaseDate: new Date(),
                CategoryID: "lamp",
                ImageURL: null,
                Downloads: 0,
                Comments: null,
                createdAt: new Date(),
                updatedAt: new Date(),
            }
        } as unknown as Request
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response



        await _WadsController.create(req,res)

        expect(mocks.create).toHaveBeenCalledOnce()
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/wads/${id}`)
        expect(res.sendStatus).toHaveBeenCalledWith(201)
    })

    test("Return_ModifiedGameById_with201Status", async() => {
        mocks.findByPk.mockResolvedValue({ id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7" })
         const wad =
         {
            id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7",
            WadName:"vi-wad-test1",
            WadDescription:"vi-wad-test1",
            ReleaseDate: new Date(),
            CategoryID: "lamp",
            ImageURL: null,
            Downloads: 0,
            Comments: null,
            createdAt: new Date(),
            updatedAt: new Date(),
         }
        const explicitTime = new Date();
        mocks.update.mockResolvedValue([1])
        const req = {
            protocol: "http",
            get: vi.fn(()=>"localhost:8080"),
            params: {
                id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7",
            },
            body: {
                WadName:"vi-wad-test4-update",
                WadDescription:"vi-wad-test4-update",
                ReleaseDate: new Date(),
                CategoryID: "laelamp",
                ImageURL: null,
                Downloads: 679,
                Comments: null,
                createdAt: wad.createdAt,
                updatedAt: explicitTime,
            }
        } as unknown as Request

        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response

        //ökshun
        await _WadsController.modifyByID(req, res)

        expect(mocks.findByPk).toHaveBeenCalledWith(wad.id)
        expect(mocks.update).toHaveBeenCalledOnce()
        expect(mocks.update).toHaveBeenCalledWith(
            expect.objectContaining({
                id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7",
                WadName:"vi-wad-test4-update",
                WadDescription:"vi-wad-test4-update",
                ReleaseDate: wad.ReleaseDate,
                CategoryID: "laelamp",
                ImageURL: null,
                Downloads: 679,
                Comments: null,
                createdAt: wad.createdAt,
                updatedAt: expect.any(Date),
            }),
            {where: {
                id: wad.id
            }}
        )
        const updatedWad = mocks.update.mock.calls[0][0]
        console.log("updatedWad: " *updatedWad)
        expect(updatedWad.WadName).toBe(req.body.WadName)
        expect(updatedWad.WadDescription).toBe(req.body.WadDescription)
        expect(updatedWad.CategoryID).toBe(req.body.CategoryID)
        expect(updatedWad.ReleaseDate).toBe(req.body.ReleaseDate)
        expect(updatedWad.ImageURL).toBe(req.body.ImageURL)
        expect(updatedWad.Downloads).toBe(req.body.Downloads)
        expect(updatedWad.Comments).toBe(req.body.Comments)
        expect(updatedWad.createdAt).toBe(req.body.createdAt)
        expect(updatedWad.updatedAt).toBe(req.body.updatedAt)
        expect(res.status).toHaveBeenCalledWith(201)
    })
    test("Return_NoContentOnDelete_With204Status", async () => {
        const destroy = vi.fn()
        mocks.findByPk.mockResolvedValue({ id: "e893c616-f83b-48b6-8bb0-f8a80ba538f7" })
        const req = {
            params: {
                id:
                "e893c616-f83b-48b6-8bb0-f8a80ba538f7"
        }}
    
    })