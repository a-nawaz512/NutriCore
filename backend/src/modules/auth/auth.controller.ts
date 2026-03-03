import { Request, Response } from "express";
import * as authService from "./auth.service.js";

export const register = async (req: Request, res: Response) => {
  const { body } = (req as any).validated;

  const { user, accessToken, refreshToken } =
    await authService.registerUser(body);
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .status(201)
    .json({
      success: true,
      accessToken,
      user,
    });
};