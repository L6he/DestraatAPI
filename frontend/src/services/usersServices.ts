import { apiFetch } from "@/api/client";
import type { User, UserRegister, UserSummary } from "../types/User";

const API_URL = import.meta.env.VITE_BACKEND_URL;

export const usersServices = {
    getAll(): Promise<UserSummary[]> {
        return apiFetch<UserSummary[]>("/users")
    },
    getByID(id: string): Promise<User> {
        return apiFetch<User>(`/users/${id}`)
    },
    register(user: UserRegister): Promise<void> {
        return apiFetch<void>("/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(user)
        })
    }
}