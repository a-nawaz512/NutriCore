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

const storedAuth =
  typeof window !== "undefined"
    ? JSON.parse(localStorage.getItem("auth") || "null")
    : null;

export const useAuthStore = create<AuthState>((set) => ({
  // ✅ load from localStorage on startup
  user: storedAuth?.user || null,
  accessToken: storedAuth?.accessToken || null,

  setAuth: (user, accessToken) => {
    set({ user, accessToken });

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