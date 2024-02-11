import { compare, hash } from "bcrypt";
import User from "../models/userModel.js";
import { createToken } from "../utils/tokenManager.js";
import { COOKIE_NAME } from "../utils/constants.js";
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find();
        return res.status(200).json({ message: "OK", users });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
export const userSignUp = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({ message: "User already exists" });
        }
        const hashPassword = await hash(password, 10);
        const user = new User({ name, email, password: hashPassword });
        await user.save();
        // clear cookie, create token, and save cookie again with new token
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expiryTime = new Date();
        expiryTime.setDate(expiryTime.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires: expiryTime,
            httpOnly: true,
            signed: true,
        });
        return res
            .status(201)
            .json({ message: "OK", name: user.name, email: user.email });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
export const userLogin = async (req, res, next) => {
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
        // clear cookie, create token, and save cookie again with new token
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        const token = createToken(user._id.toString(), user.email, "7d");
        const expiryTime = new Date();
        expiryTime.setDate(expiryTime.getDate() + 7);
        res.cookie(COOKIE_NAME, token, {
            path: "/",
            domain: "localhost",
            expires: expiryTime,
            httpOnly: true,
            signed: true,
        });
        // Send response
        return res.status(200).json({
            message: "user login successfull",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
export const verifyUser = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User is not registered or Token not working" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // Send response
        return res.status(200).json({
            message: "user verified successfull",
            name: user.name,
            email: user.email,
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
export const userLogout = async (req, res, next) => {
    try {
        const user = await User.findById(res.locals.jwtData.id);
        if (!user) {
            return res
                .status(401)
                .json({ message: "User is not registered or Token not working" });
        }
        if (user._id.toString() !== res.locals.jwtData.id) {
            return res.status(401).json({ message: "Authentication failed" });
        }
        // clear cookie, create token, and save cookie again with new token
        res.clearCookie(COOKIE_NAME, {
            path: "/",
            domain: "localhost",
            httpOnly: true,
            signed: true,
        });
        // Send response
        return res.status(200).json({
            message: "user logout successfull",
        });
    }
    catch (error) {
        return res.status(500).json({ message: "Error", cause: error.message });
    }
};
//# sourceMappingURL=userControllers.js.map