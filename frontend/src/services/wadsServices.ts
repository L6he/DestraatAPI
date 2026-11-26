import { apiFetch } from "@/api/client";
import type { Wad, WadSummary, WadInput, Category } from "../types/Wad";
const API_URL = import.meta.env.VITE_BACKEND_URL;

export const wadsServices = {
    getAll(): Promise<WadSummary[]> {
        return apiFetch<WadSummary[]>("/wads")
    },
    getByID(id: string): Promise<Wad> {
        return apiFetch<Wad>(`/wads/${id}`);
    },
    create(wad:WadInput): Promise<void> {
        return apiFetch<void>("/wads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wad)
        });
    },
    update(id: string, wad: WadInput): Promise<void> {
        return apiFetch<void>(`/wads/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wad)
        });
    },
    delete(id: string): Promise<void> {
        return apiFetch<void>(`/wads/${id}`, {
            method: "DELETE"
        });
    }
}