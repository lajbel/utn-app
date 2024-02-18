import type { LoginUser, RegisterUser, User } from "@/types/Models";
import axios from "./axios";

export function registerRequest(user: RegisterUser) {
    return axios.post("/auth/register", user);
}

export function loginRequest(user: LoginUser) {
    return axios.post("/auth/login", user);
}

export function verifyToken() {
    return axios.get("/auth/verify");
}
