export interface User {
    id?: number;
    username: string;
    email?: string;
    password: string;
    profile: Profile;
    profile_photo?: string;
    first_name: string;
    last_name: string;
}

export interface Post{
    id: number;
    text: string;
    image: string;
    author: User;
    created_at: string;
}

export interface Token{
    refresh: string;
    access: string;
}

export interface Profile{
    bio?: string;
    profile_photo?: string;
}