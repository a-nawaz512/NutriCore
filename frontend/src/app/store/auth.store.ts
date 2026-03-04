import { create } from "zustand";

export interface User {
  _id: string;
  name: string;
  email: string;
  role: "user" | "admin";
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setAuth: (user: User, accessToken: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  accessToken: null,

  setAuth: (user, accessToken) => {
    set({ user, accessToken });
    // Persist in localStorage
    localStorage.setItem(
      "auth",
      JSON.stringify({ user, accessToken })
    );
  },

  logout: () => {
    set({ user: null, accessToken: null });
    localStorage.removeItem("auth");
  },
}));