import type { User, UserRegister, UserSummary } from "../types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL;

async function request<T>(endpoint: string, options?: RequestInit): Promise<T> { //kirjutame ühe template-i, mida saame mitu korda kasutada
    const response = await fetch(API_URL + endpoint, {...options, credentials: "include"}); //vaja panna kaasa autentimise HttpOnly cookie, "vaja spreadida"???, võiks teistega ka teha
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
    },
    register(user: UserRegister): Promise<void> {
        return request<void>("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
}