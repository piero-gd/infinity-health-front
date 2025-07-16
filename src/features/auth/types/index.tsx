export interface LoginCredentials {
  username: string;
  password: string;
}

export interface AuthResponse {
  access: string;
  user_data: {
    username: string;
    email: string;
    id: number;
    first_name: string;
    last_name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    birth_date: null | string;
  };
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface RegisterResponse {
  username: string;
  email: string;
}

