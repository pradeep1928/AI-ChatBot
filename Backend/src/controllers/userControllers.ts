import { hash } from "bcrypt";
import User from "../models/userModel.js";
import { Request, Response, NextFunction } from "express";

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const users = await User.find();
    return res.status(200).json({ message: "OK", users });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userSignUp = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({email})
    if (existingUser) {
        return res.status(401).json({message: "User already exists"})
    }
    const hashPassword = await hash(password, 10)
    const user = new User({name, email, password: hashPassword});
    await user.save()
    return res.status(201).json({ message: "OK", user: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
