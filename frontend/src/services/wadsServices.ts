import type { Wad, WadSummary, WadInput, Category } from "../types/Wad";
const API_URL = import.meta.env.VITE_BACKEND_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> {//T for template?
    const response = await fetch(API_URL + endpoint, options);

    if (!response.ok) {
        throw new Error(
            `Request has failed, status: ${response.status}`
        );
    }
    if (response.status === 204) {
        return undefined as T;
    }
    return response.json() as Promise<T>;
}
//service

export const wadsServices = {
    getAll(): Promise<WadSummary[]> {
        return request<WadSummary[]>("/wads")
    },
    getByID(id: string): Promise<Wad> {
        return request<Wad>(`/wads/${id}`);
    },
    create(wad:WadInput): Promise<void> {
        return request<void>("/wads", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wad)
        });
    },
    update(id: string, wad: WadInput): Promise<void> {
        return request<void>(`/wads/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(wad)
        });
    },
    delete(id: string): Promise<void> {
        return request<void>(`/wads/${id}`, {
            method: "DELETE"
        });
    }
}