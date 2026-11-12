import { describe, it, expect, vi, test, beforeEach} from "vitest";
//kopeeritud Vaitmaalt:
//describe, organiseerib teste
//it - on üks test case, on sama nagu test()
//expect - on assert, "expect(10).toBe(5)", expected ja actuali analoog
//vi - virtualiseerija millega tehakse mockobjekte, meetodeid, andmebaase jne - on kui "virtual"
//beforeEach käivitab setupi enne igat testi
import type { Request, Response } from "express";
import { v7 as uuidv7 } from "uuid";

//mock db
const mocks = vi.hoisted(() => ({
    findAll: vi.fn(),
    findByPk: vi.fn()
}));

vi.mock("../../db.ts", () => ({
    db: {
        wads: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk
        }
    }
}))

import _WadsController from "../../controllers/WadsController.ts"
import { Wad } from "../../models/Wad.ts";

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
})