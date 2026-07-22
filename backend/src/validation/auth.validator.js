import { check, validationResult } from "express-validator";

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array()[0].msg });
  }
  next();
};

export const validateRegister = [
  check("name") 
    .trim()
    .notEmpty()
    .withMessage("Name is required."),
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required.")
    .isEmail()
    .withMessage("Please provide a valid email address."),
  check("password")
    .notEmpty()
    .withMessage("Password is required.")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long."),
  check("storeName")
    .if((value, { req }) => req.body.role === "seller")
    .notEmpty()
    .withMessage("Store name is required for seller accounts."),
  validate,
];

export const validateLogin = [
  check("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required."),
  check("password")
    .notEmpty()
    .withMessage("Password is required."),
  validate,
];
