export type LoginCredentials = {
    email: string;
    password: string;
}
  
export type LoginResponse = {
token: string;
refreshToken: string;
user: User;
}

export type User = {
    id: string;
    name: string;
    email: string;
}

export type AuthState = {
isAuthenticated: boolean;
token: string | null;
isLoading: boolean;
error: string | null;
}

export type LoginError = {
    code: string;
    message: string;
}

export type AuthRepository = {
    login(credentials: LoginCredentials): Promise<LoginResponse>;
    logout(): Promise<void>;
    validateToken(token: string): Promise<boolean>;
    refreshToken(refreshToken: string): Promise<LoginResponse>;
}