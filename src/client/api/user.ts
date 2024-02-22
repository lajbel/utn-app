import type { User } from "@/types/user";
import axios from "./axios";

export function getUser(id: string) {
    return axios.get<{
        user: User;
    }>(`/users/${id}`);
}
