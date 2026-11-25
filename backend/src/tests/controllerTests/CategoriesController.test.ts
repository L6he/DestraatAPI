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
    update: vi.fn(),
    destroy: vi.fn()
}));

vi.mock("../../db.ts", () => ({
    db: {
        categories: {
            findAll: mocks.findAll,
            findByPk: mocks.findByPk,
            create: mocks.create,
            update: mocks.update,
            destroy: mocks.destroy
        }
    }
}));

//import controller
import _CategoriesController from "../../controllers/CategoriesController.ts";
import CategoriesController from "../../controllers/CategoriesController.ts";
import type { Category } from "../../models/Category.ts";

//describe the test set for WadsController
describe("CategoriesController", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("Return_AllCategories_With200Status", async () => {
        //setup
        mocks.findAll.mockResolvedValue(
            [
                {
                    id: "01a211db-3a12-7589-a1ae-65859eeef452",
                    CategoryName: "vi-category-test1",
                    CategoryDescription: "Wads for DooM1 test category"
                },
                
                {
                    id: "01a211dd-0999-7068-a6c0-17b9739444b6",
                    CategoryName: "vi-category-test2",
                    CategoryDescription: "Wads for DooM 2 test category"
                },
    
                {
                    id: "01a211e0-aee1-76ea-a660-11b5263619a7",
                    CategoryName: "vi-category-test3",
                    CategoryDescription: "Wads for DooM 3 test category"
                }
            ]
        );
        const req = {} as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //action
        await _CategoriesController.getAll(req, res);

        //checks, chex quest
        expect(mocks.findAll).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith([
            {
                id: "01a211db-3a12-7589-a1ae-65859eeef452",
                CategoryName: "vi-category-test1",
                CategoryDescription: "Wads for DooM1 test category"
            },
            
            {
                id: "01a211dd-0999-7068-a6c0-17b9739444b6",
                CategoryName: "vi-category-test2",
                CategoryDescription: "Wads for DooM 2 test category"
            },

            {
                id: "01a211e0-aee1-76ea-a660-11b5263619a7",
                CategoryName: "vi-category-test3",
                CategoryDescription: "Wads for DooM 3 test category"
            }
        ]);
    });

    test("Return_OneCategoryById_With200Status", async() =>{
        const category = 
        { 
            id: "01a211db-3a12-7589-a1ae-65859eeef452",
            CategoryName: "vi-category-test1",
            CategoryDescription: "Wads for DooM1 test category",
            createdAt: new Date(),
            updatedAt: new Date(),
        }

        const req = {
            params: {
                id: category.id
            }
        } as unknown as Request;
       
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis(),
        } as unknown as Response;
        mocks.findByPk.mockResolvedValue(category);

        await _CategoriesController.getByID(req, res);

        expect(mocks.findByPk).toHaveBeenCalledExactlyOnceWith(category.id);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.send).toHaveBeenCalledWith(category);
    });

    test("Return_CreatedCategory_With201Status", async () => {
        const id = "4f5edb70-29de-4e38-8205-dc7d7591ad88";
        mocks.create.mockResolvedValue({ id: id });
        const req = {
            protocol: "http",
            get: vi.fn(() => "localhost:8080"),
            body: {
                CategoryName: "vi-category-test4",
                CategoryDescription: "vi-category-testcription4",
                createdAt: new Date(),
                updatedAt: new Date()
            }
        } as unknown as Request;
        const res = {
            location: vi.fn().mockReturnThis(),
            sendStatus: vi.fn().mockReturnThis()
        } as unknown as Response;

        //actions
        await _CategoriesController.create(req, res);

        //checks
        expect(mocks.create).toHaveBeenCalledOnce();
        expect(res.location).toHaveBeenCalledWith(`http://localhost:8080/categories/${id}`);
        expect(res.sendStatus).toHaveBeenCalledWith(201);
    });

    test("Return_ModifiedCategoryById_With201Status", async () => {
        mocks.findByPk.mockResolvedValue({ id: "73deb785-3471-43af-bb31-a146edb10bcc" });
        const category = {
            id: "73deb785-3471-43af-bb31-a146edb10bcc",
            CategoryName: "vi-category-test5",
            CategoryDescription: "vi-category-testcription5",
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
                CategoryName: "vi-category-test5-updated",
                CategoryDescription: "vi-category-testcription5-updated",
                createdAt: category.createdAt,
                updatedAt: new Date()
            }
        } as unknown as Request;
        const res = {
            location: vi.fn().mockReturnThis(),
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //actions
        const result = await _CategoriesController.modifyByID(req, res) as unknown as Category;

        //checks
        expect(mocks.findByPk).toHaveBeenCalledWith(category.id);
        expect(mocks.update).toHaveBeenCalledOnce();

        const updatedCategory = mocks.update.mock.calls[0][0]; // if it works, it works
        console.log("updatedCategory", updatedCategory);
        expect(updatedCategory.CategoryName).toBe(req.body.CategoryName);
        expect(updatedCategory.CategoryDescription).toBe(req.body.CategoryDescription);
        expect(updatedCategory.createdAt).toBe(undefined);
        expect(updatedCategory.updatedAt).toBeInstanceOf(Date);
        expect(mocks.update.mock.calls[0][1]).toEqual({ 
            where: { 
                id: category.id 
            } 
        });
        expect(res.status).toHaveBeenCalledWith(201);
    });

    test("Return_NoContentOnDelete_With204Status", async () => {
        const thisId = "5f26e8c6-20e4-4e4d-a77b-4de7e77302b9";
        const category = {
            id: thisId,
            destroy: vi.fn().mockResolvedValue(undefined)
        };
        mocks.findByPk.mockResolvedValue(category);
        const req = {
            params: {
                id: thisId
            }
        } as unknown as Request;
        const res = {
            status: vi.fn().mockReturnThis(),
            send: vi.fn().mockReturnThis()
        } as unknown as Response;

        //actions
        await _CategoriesController.deleteByID(req, res);

        //checks
        expect(mocks.findByPk).toHaveBeenCalledWith(thisId);
        expect(category.destroy).toHaveBeenCalledOnce();
        expect(res.status).toHaveBeenCalledWith(204);
    });
});
