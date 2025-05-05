export interface User {
    id?: number;
    username: string;
    email?: string;
    password: string;
    profile: Profile;
    profile_photo?: string;
}

export interface Post{
    id: number;
    text: string;
    image: string;
    author: User;
}

export interface Token{
    refresh: string;
    access: string;
}

export interface Profile{
    bio?: string;
    profile_photo?: string;
}