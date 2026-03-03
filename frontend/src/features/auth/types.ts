export interface RegisterInput {
  name: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  status: string;
  token?: string;

    user: {
      _id: string;
      name: string;
      email: string;
      role: "user" | "admin";
    };
  
}