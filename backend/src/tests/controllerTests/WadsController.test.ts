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
    findByPk: vi.fn(),
    create: vi.fn(),
    update: vi.fn()
}));

vi.mock("../../db.ts", () => ({
    db: {
        wads: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update
        }
    }
}));

//import controller
import _WadsController from "../../controllers/WadsController.ts";
import WadsController from "../../controllers/WadsController.ts";
import type { Wad } from "../../models/Wad.ts";

//describe the test set for WadsController
describe("WadsController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Return_AllWads_With200Status", async () => {
        //setup
        mocks.findAll.mockResolvedValue(
            [
                {id: "e893c616-f83b-48b6-8bb0-f8a80ba538f7",
                    WadName:"vi-wad-test1"},
                {id: "f31d3f7f-f0d7-4009-a701-ed2391d1183a",
                    WadName:"vi-wad-test2"},
                {id: "12efab20-add0-4b69-be3f-0938e902963f",
                    WadName:"vi-wad-test3"}
            ]
        );
        const req = {} as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //action
        await _WadsController.getAll(req, res);

        //checks, chex quest
        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {id: "e893c616-f83b-48b6-8bb0-f8a80ba538f7",
                WadName:"vi-wad-test1"},
            {id: "f31d3f7f-f0d7-4009-a701-ed2391d1183a",
                WadName:"vi-wad-test2"},
            {id: "12efab20-add0-4b69-be3f-0938e902963f",
                WadName:"vi-wad-test3"}
        ]);
    });

    test("Return_OneWadById_With200Status", async() =>{
        const wad = {
            id:"e893c616-f83b-48b6-8bb0-f8a80ba538f7",
            WadName:"vi-wad-test1",
            WadDescription:"vi-wad-testcription1",
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
        } as unknown as Request;
       
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response;
        mocks.findByPk.mockResolvedValue(wad);

        await _WadsController.getByID(req, res);

        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(wad.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(wad);
    });

    test("Return_CreatedWad_With201Status", async () => {
        const id = "4f5edb70-29de-4e38-8205-dc7d7591ad88";
        mocks.create.mockResolvedValue({ id: id });
        const req = {
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                WadName: "vi-wad-test4",
                WadDescription: "vi-wad-testcription4",
                ReleaseDate: new Date(),
                CategoryID: "173",
                ImageURL: null,
                Downloads: 0,
                Comments: null,
                createdAt: new Date(),
                updatedAt: new Date()
            }
        } as unknown as Request;
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response;

        //actions
        await _WadsController.create(req, res);

        //checks
        expect(mocks.create).toHaveBeenCalledOnce();
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/wads/${id}`);
        expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    test("Return_ModifiedWadById_With201Status", async () => {
        mocks.findByPk.mockResolvedValue({ id: "73deb785-3471-43af-bb31-a146edb10bcc" });
        const wad = {
            id: "73deb785-3471-43af-bb31-a146edb10bcc",
            WadName: "vi-wad-test5",
            WadDescription: "vi-wad-testcription5",
            ReleaseDate: new Date(),
            CategoryID: "939",
            ImageURL: null,
            Downloads: 0,
            Comments: null,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        const explicitTime = new Date();
        mocks.update.mockResolvedValue([1]);
        const req = {
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            params: {
                id: "73deb785-3471-43af-bb31-a146edb10bcc"
            },
            body: 
            {
                WadName: "vi-wad-test5-updated",
                WadDescription: "vi-wad-testcription5-updated",
                ReleaseDate: wad.ReleaseDate,
                CategoryID: "953",
                ImageURL: null,
                Downloads: 120,
                Comments: null,
                createdAt: wad.createdAt,
                updatedAt: new Date()
            }
        } as unknown as Request;
        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //actions
        const result = await _WadsController.modifyByID(req, res) as unknown as Wad;

        //checks
        expect(mocks.findByPk).toHaveBeenCalledWith(wad.id);
        expect(mocks.update).toHaveBeenCalledOnce();

        const updatedWad = mocks.update.mock.calls[0][0];
        console.log("updatedWad", updatedWad);
        expect(updatedWad.WadName).toBe(req.body.WadName);
        expect(updatedWad.WadDescription).toBe(req.body.WadDescription);
        expect(updatedWad.ReleaseDate).toBe(req.body.ReleaseDate);
        expect(updatedWad.CategoryID).toBe(req.body.CategoryID);
        expect(updatedWad.Downloads).toBe(req.body.Downloads);
        expect(updatedWad.ImageURL).toBe(req.body.ImageURL);
        expect(updatedWad.Comments).toBe(req.body.Comments);
        expect(updatedWad.createdAt).toBe(undefined);
        expect(updatedWad.updatedAt).toBeInstanceOf(Date);
        expect(mocks.update.mock.calls[0][1]).toEqual({ 
            where: { 
                id: wad.id 
            } 
        });
        expect(res.status).toHaveBeenCalledWith(201);
    });
});
