import { Request, Response, NextFunction } from "express";
import { ValidationChain, body, validationResult } from "express-validator";

export const validate = (validations: ValidationChain[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    for (let validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        break;
      }
    }
    const error = validationResult(req)
    if (!error.isEmpty()) {
        return res.status(422).json({error: error.array()})
    } else {
        return next()
    }

  };
};

export const loginValidator = [
  body("email").trim().isEmail().withMessage("Email is required"),
  body("password")
    .trim()
    .isLength({ min: 6, max: 16 })
    .withMessage("Password should contain characters between 6 to 16"),
];


export const signupValidator = [
  body("name").notEmpty().withMessage("Name is required"),
  ...loginValidator
];
