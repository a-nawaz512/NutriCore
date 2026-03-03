import { api } from "../../../lib/axios";
import type { AuthResponse, RegisterInput } from "../types";
// import { RegisterInput, AuthResponse } from "../types.ts";

export const registerUser = async (
  payload: RegisterInput
): Promise<AuthResponse> => {
  const res = await api.post("/auth/register", payload);
  return res.data;
};