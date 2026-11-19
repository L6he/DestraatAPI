import type { User, UserSummary } from "../types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL;

async function request<T>(endpoint: string): Promise<T> { //kirjutame ühe template-i, mida saame mitu korda kasutada
    const response = await fetch(API_URL + endpoint);
    if (!response.ok) {
        throw new Error(
            `Request has failed, status: ${response.status}`
        );
    }
    return response.json() as Promise<T>;
}

export const usersServices = {
    getAll(): Promise<UserSummary[]> {
        return request<UserSummary[]>("/users")
    },
    getByID(id: string): Promise<User> {
        return request<User>(`/users/${id}`)
    }
}