import { body } from "express-validator";

export const userSignupValidator = [
  body("name").isString().withMessage("Please provide a name"),
  body("email")
    .isEmail()
    .withMessage("Please enter a valid email address.")
    .normalizeEmail(),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long.")
    .matches(/\d/)
    .withMessage("Password must contain a number.")
    .trim(),
];

export const userLoginValidator = [
  body("email").isEmail().withMessage("Invalid email address").normalizeEmail(),
  body("password").isString().withMessage("Invalid credentials"),
];
