export interface User {
    id?: number;
    username: string;
    email?: string;
    password: string;
}

export interface Post{
    id: number;
    text: string;
    image: string;
}

export interface Token{
    refresh: string;
    access: string;
}