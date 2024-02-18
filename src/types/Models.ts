export type User = {
    id: string;
    email: string;
    password: string;
    username: string;
    profilePhoto?: string;
    profileDescription?: string;
};

export type UserWithoutPassword = Omit<User, "password">;

export type Recipe = {
    id: string;
    title: string;
    summary: string;
    content: string;
    tags: string[];
    portraitImage: string;
    user: UserWithoutPassword;
};

export type RegisterUser = Pick<User, "username" | "email" | "password">;
export type LoginUser = Pick<User, "email" | "password">;
