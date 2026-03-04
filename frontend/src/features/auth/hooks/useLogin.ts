import { useMutation, type UseMutationResult } from "@tanstack/react-query";
import { loginUser } from "../api/auth.api";
// import type { AuthResponse, LoginInput } from "../api/auth/auth.types";
import { useAuthStore } from "../../../app/store/auth.store";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import type { AuthResponse, LoginInput } from "../types";

export const useLogin = (): UseMutationResult<
  AuthResponse,
  any,
  LoginInput,
  unknown
> => {
  const setUser = useAuthStore((state) => state.setAuth);
  const navigate = useNavigate();

  return useMutation<AuthResponse, any, LoginInput>({
    mutationFn: loginUser,
    onSuccess: (data) => {

      console.log("user data", data);


      setUser(data.user, data.accessToken);
      toast.success("Logged in successfully!");
      navigate("/");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Login failed");
    },
  });
};