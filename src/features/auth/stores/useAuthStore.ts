import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserData {
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
}

interface AuthState {
  // Estado
  isAuthenticated: boolean;
  accessToken: string | null;
  refreshToken: string | null;
  username: string | null;
  userData: UserData | null;

  // Acciones
  login: (authData: { 
    access: string; 
    refresh?: string; 
    username?: string;
    user_data?: UserData;
  }) => void;
  logout: () => void;
  getAccessToken: () => string | null;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        // Estado inicial
        isAuthenticated: false,
        accessToken: null,
        refreshToken: null,
        username: null,
        userData: null,

        // Acciones
        login: ({ access, refresh, username, user_data }) => {
          set({
            isAuthenticated: true,
            accessToken: access,
            refreshToken: refresh || null,
            username: username || null,
            userData: user_data || null,
          });
        },

        logout: () => {
          console.log('[Auth] Cerrando sesión...');
          
          // Guardar temporalmente el nombre de usuario para el log
          const currentUsername = get().username;
          
          set({
            isAuthenticated: false,
            accessToken: null,
            refreshToken: null,
            username: null,
            userData: null,
          });
          
          console.log('[Auth] Sesión cerrada correctamente:', {
            usuario: currentUsername,
            hora: new Date().toLocaleTimeString()
          });
        },

        // Getter para token
        getAccessToken: () => get().accessToken,
      }),
      {
        name: 'auth-storage', // Nombre para la persistencia en localStorage
        partialize: (state) => ({
          // Solo persistimos estos campos
          accessToken: state.accessToken,
          refreshToken: state.refreshToken,
          username: state.username,
          userData: state.userData,
          isAuthenticated: state.isAuthenticated,
        }),
      }
    )
  )
);
