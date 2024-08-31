import jwt from "jsonwebtoken";
import ENV from "../config/ENV";
type JWTPayload = {
  email: string;
  role: "user" | "admin";
  id?: string;
};
export const generateToken = (payload: JWTPayload) => {
  return jwt.sign(payload, ENV.JWT_SECRET as string, {
    expiresIn: "2d",
  });
};
