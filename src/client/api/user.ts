import type { User, UserResponse } from "@/types/user";
import { toFormData } from "axios";
import axios from "./axios";

const BASE_URL = "/users";

export function getUserRequest(id: string) {
    return axios.get<UserResponse>(`${BASE_URL}/${id}`);
}

export function updateUserRequest(
    id: string,
    updateUser: Partial<User>,
) {
    return axios.put<UserResponse>(`${BASE_URL}/${id}`, toFormData(updateUser));
}
