export interface JwtPayload {
    email: string;
    role?: string;
}

export interface JwtOptions {
    expiresIn?: string;
}