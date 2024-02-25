import type { UserForCreate, UserForLogin } from "@/types/user";
import axios from "./axios";

const BASE_URL = "/auth";

export function registerRequest(user: UserForCreate) {
    return axios.post(`${BASE_URL}/register`, user);
}

export function loginRequest(user: UserForLogin) {
    return axios.post(`${BASE_URL}/login`, user);
}

export function verifyToken() {
    return axios.get(`${BASE_URL}/verify`);
}
