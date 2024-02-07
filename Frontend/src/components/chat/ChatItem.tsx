import React from "react";
import { Box, Avatar, Typography } from "@mui/material";
import { useAuth } from "../../context/AuthContext";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { coldarkDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

function extractCodeFromString(message: string) {
    if (message.includes("```")) {
        const blocks = message.split("```")
        return blocks
    }
}

function isCodeBlock(str:string) {
    const codeKeywords = ['=', ';', '[', ']', '{', '}', '#', '//'];

    for (const keyword of codeKeywords) {
        if (str.includes(keyword)) {
            return true;
        }
    }
    return false;
}

const ChatItem = ({
    content,
    role,
}: {
    content: string;
    role: "user" | "assistant" | string;
}) => {
    const auth = useAuth()
    const messageBlocks = extractCodeFromString(content)
    return role === "assistant" ? (
        <Box
            sx={{
                width: "100%",
                boxSizing: "border-box",
                display: "flex",
                p: 2,
                bgcolor: "#004d5612",
                my: 2,
                gap: 2,
            }}
        >
            <Avatar sx={{ ml: 0 }}>
                <img src="open-ai.png" alt="openai" width={'30px'} />
            </Avatar>
            <Box sx={{ width: "100%" }}>
                {!messageBlocks && (<Typography fontSize={'20px'}>{content}</Typography>
                )}
                {messageBlocks && messageBlocks.length && messageBlocks.map((block, index) => {
                    return isCodeBlock(block) ?
                        <SyntaxHighlighter key={index}
                            style={coldarkDark} language="javascript">{block}</SyntaxHighlighter> :
                        <Typography fontSize={'20px'}>{block}</Typography>
                })}
            </Box>
        </Box>
    ) : (
        <Box
            sx={{
                display: "flex",
                p: 2,
                bgcolor: "#004d56",
                gap: 2,
            }}
        >
            <Avatar sx={{ ml: 0, bgcolor: 'black', color: 'white' }}>
                {auth?.user?.name[0]}
                {auth?.user?.name.split(" ")[1][0]}
            </Avatar>
            <Box>
                <Typography fontSize={'20px'}>{content}</Typography>
            </Box>
        </Box>

    );
};

export default ChatItem;
