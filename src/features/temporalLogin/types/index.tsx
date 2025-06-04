export interface LoginCredentials {
  username: string;
  password: string;
}

export interface UserInfo {
  username: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  username: string;
}
