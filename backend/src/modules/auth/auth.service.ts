import { User } from "../../modules/user/user.model.js";
import { generateAccessToken, generateRefreshToken } from "../../utils/generateToken.js";
import { ApiError } from "../../utils/ApiError.js";

export const registerUser = async (payload: any) => {
  const exists = await User.findOne({ email: payload.email });
  if (exists) throw new ApiError(400, "Email already exists");

  const user = await User.create(payload);

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  return { user, accessToken, refreshToken };
};

export const loginUser = async (email: string, password: string) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) throw new ApiError(400, "Invalid credentials");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) throw new ApiError(400, "Invalid credentials");

  const accessToken = generateAccessToken(user._id.toString(), user.role);
  const refreshToken = generateRefreshToken(user._id.toString());

  return { user, accessToken, refreshToken };
};