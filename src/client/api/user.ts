import type { User, UserForCreate } from "@/types/user";
import axios from "./axios";

export function getUserRequest(id: string) {
    return axios.get<{
        user: User;
    }>(`/users/${id}`);
}

export function updateUserRequest(
    id: string,
    updateUser: Partial<UserForCreate>,
) {
    return axios.put(`/users/${id}`, updateUser);
}
