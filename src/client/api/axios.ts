import axios from "axios";

const instance = axios.create({
    baseURL: "/api",
    withCredentials: true,
});

// Utils
export const toFormData = (obj: Record<string, any>) => {
    const formData = new FormData();

    for (const key in obj) {
        if (Array.isArray(obj[key])) {
            obj[key].forEach((item: any) => {
                formData.append(key, item);
            });
        }
        else {
            formData.append(key, obj[key]);
        }
    }

    return formData;
};

export default instance;
