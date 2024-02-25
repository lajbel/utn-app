import type { UserForCreate, UserForLogin } from "@/types/user";
import axios from "./axios";

export function registerRequest(user: UserForCreate) {
    return axios.post("/auth/register", user);
}

export function loginRequest(user: UserForLogin) {
    return axios.post("/auth/login", user);
}

export function verifyToken() {
    return axios.get("/auth/verify");
}
