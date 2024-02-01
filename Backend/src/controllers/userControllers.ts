import { compare, hash } from "bcrypt";
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
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({ message: "User already exists" });
    }
    const hashPassword = await hash(password, 10);
    const user = new User({ name, email, password: hashPassword });
    await user.save();
    return res.status(201).json({ message: "OK", id: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};

export const userLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered, please sign-up" });
    }
    const isPasswordCorrect = await compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(403).json({ message: "Password is incorrect" });
    }
    return res.status(200).json({ message: "user login successfull", id: user._id });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
