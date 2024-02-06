import User from "../models/userModel.js";
import { OpenAIApi } from "openai";
import { configureOpenai } from "../config/openaiConfig.js";
export const generateChatCompletion = async (req, res, next) => {
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
        }));
        chats.push({ content: message, role: "user" });
        user.chats.push({ content: message, role: "user" });
        const config = configureOpenai();
        const openai = new OpenAIApi();
        const chatResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: chats,
        });
        user.chats.push(chatResponse.data.choices[0].message);
        await user.save();
        return res.status(200).json({ chats: user.chats });
    }
    catch (error) {
        console.log("this is error: ", error);
        res.status(500).json({ message: "Something went wrong" });
    }
};
//# sourceMappingURL=chatControllers.js.map