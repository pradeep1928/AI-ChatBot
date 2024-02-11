import { Request, Response, NextFunction } from "express";
import User from "../models/userModel.js";
import { OpenAIApi, ChatCompletionRequestMessage } from "openai";
import { configureOpenai } from "../config/openaiConfig.js";

export const generateChatCompletion = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { message } = req.body;
    const user = await User.findById(res.locals.jwtData.id);
    if (!user) {
      return res
        .status(401)
        .json({ message: "User is not registered or Token not working" });
    }

    const chats = user.chats.map(({ role, content }) => ({
      role,
      content,
    })) as ChatCompletionRequestMessage[];
    chats.push({ content: message, role: "user" });
    user.chats.push({ content: message, role: "user" });

    const config = configureOpenai();
    const openai = new OpenAIApi(config);
    const chatResponse = await openai.createChatCompletion({
      model: "gpt-3.5-turbo",
      messages: chats,
    });

    user.chats.push(chatResponse.data.choices[0].message);
    await user.save();
    return res.status(200).json({ chats: user.chats });
  } catch (error) {
    console.log("this is error: ", error)
    res.status(500).json({message: "Something went wrong"})
  }
};


export const sendChatsToUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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
      message: "OK",
      chats: user.chats
    });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};


export const deleteChats = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
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

    // @ts-ignore
    user.chats = []
    await user.save()
    // Send response
    return res.status(200).json({
      message: "All chats deleted", user: user._id
    });
  } catch (error) {
    return res.status(500).json({ message: "Error", cause: error.message });
  }
};
