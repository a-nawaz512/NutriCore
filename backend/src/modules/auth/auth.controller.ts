import { Request, Response } from "express";
import * as authService from "./auth.service.js";
import { RegisterSchema } from "./auth.validation.js";

type ExtendedRequest = Request & {validated: RegisterSchema};

export const register = async (req: ExtendedRequest, res: Response) => {

  

  const { body } = req.validated;

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



export const login = async (req: Request, res: Response) => {
  const { body } = (req as any).validated;

  const { user, accessToken, refreshToken } =
    await authService.loginUser(body.email, body.password);

  // Convert to plain object and remove password
  const userObject = user.toObject();
  const { password, ...safeUser } = userObject;
  res
    .cookie("refreshTokenSchema", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    })
    .status(200)
    .json({
      status: "success",
      message: "Login successful",
        accessToken,
        user: userObject,
    });
};
