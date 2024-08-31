import { Request, Response, NextFunction } from "express";
import ENV from "../config/ENV";
import { HttpStatus } from "../types/HttpStatus";
import CustomError from "../utils/customError";
import { generateToken } from "../utils/generateToken";
import { matchedData, validationResult } from "express-validator";

/**
 * * METHOD: POST
 * * Login the admin User
 */
const adminLogin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return next(errors);

    const { email, password } = matchedData(req);
    if (email !== ENV.ADMIN_EMAIL || password !== ENV.ADMIN_PASSWORD) {
      return next(
        new CustomError("Invalid credentials", HttpStatus.BAD_REQUEST)
      );
    }
    const access_token = generateToken({ email, role: "admin" });
    return res.json({
      success: true,
      message: "Login successful",
      access_token,
    });
  } catch (error) {
    next(error);
  }
};
export { adminLogin };
