export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  username: string;
}

export interface RegisterCredentials {
  name: string;
  email: string;
  username: string;
  password: string;
}