import { z } from "zod";

/**
 * Strong password policy
 * - Minimum 8 characters
 * - At least 1 uppercase
 * - At least 1 lowercase
 * - At least 1 number
 * - At least 1 special character
 */
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters")
  .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
  .regex(/[a-z]/, "Password must contain at least one lowercase letter")
  .regex(/[0-9]/, "Password must contain at least one number")
  .regex(
    /[^A-Za-z0-9]/,
    "Password must contain at least one special character"
  );

/**
 * Register Validation
 */
export const registerSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(3, "Name must be at least 3 characters")
      .max(50, "Name too long")
      .trim(),

    email: z
      .string()
      .email("Invalid email format")
      .toLowerCase()
      .trim(),

    password: passwordSchema,
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

/**
 * Login Validation
 */
export const loginSchema = z.object({
  body: z.object({
    email: z
      .string()
      .email("Invalid email format")
      .toLowerCase()
      .trim(),

    password: z.string().min(1, "Password is required"),
  }),

  params: z.object({}).optional(),
  query: z.object({}).optional(),
});

/**
 * Refresh Token Validation
 * (If you ever move refresh token to body instead of cookie)
 */
export const refreshTokenSchema = z.object({
  body: z.object({}).optional(),
  params: z.object({}).optional(),
  query: z.object({}).optional(),
});