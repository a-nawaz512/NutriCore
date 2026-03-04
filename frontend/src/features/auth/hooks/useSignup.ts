// src/api/auth/auth.hooks.ts
import { useMutation } from "@tanstack/react-query";
import { registerUser, loginUser } from "../api/auth.api";
import { useAuthStore } from "../../../app/store/auth.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

// ------------------------
// Register Hook
// ------------------------
export const useRegister = () => {
  const setUser = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation({
    mutationFn: registerUser,
    onSuccess: (data) => {
      console.log("backend data", data);
      setUser(data.user);
      toast.success("Account created successfully!");
      navigate("/"); // redirect after register
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Registration failed");
    },
  });
};

