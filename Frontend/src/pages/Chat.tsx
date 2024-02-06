import React, { useRef } from "react";
import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import ChatItem from "../components/chat/ChatItem";
import { IoMdSend } from "react-icons/io"

const chatMessages = [
  { role: "user", content: "Hello, AI! What's the weather like today?" },
  {
    role: "assistant",
    content:
      "Hi there! I can help you with that. Please provide me with your location.",
  },
  { role: "user", content: "I'm in New York City." },
  {
    role: "assistant",
    content: "Great! Let me check the weather for you. One moment, please.",
  },
  {
    role: "assistant",
    content: "The current weather in New York City is 75°F with a clear sky.",
  },
  { role: "user", content: "Thanks! What about the upcoming weekend?" },
  {
    role: "assistant",
    content: "Sure thing! Let me fetch the weekend forecast for you.",
  },
  {
    role: "assistant",
    content:
      "It looks like there will be some scattered showers on Saturday, but Sunday should be mostly sunny with a high of 78°F.",
  },
  { role: "user", content: "Awesome! Anything else I should know?" },
  {
    role: "assistant",
    content:
      "No problem! If you have any more questions or need assistance, feel free to ask. I'm here to help!",
  },
];

const Chat = () => {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const auth = useAuth();
  return (
    <Box
      sx={{
        boxSizing: 'border-box',
        display: "flex",
        flex: 1,
        width: "100%",
        height: "100%",
        mt: 3,
        gap: 3,
      }}
    >
      <Box
        sx={{
          boxSizing: 'border-box',
          display: { md: "flex", xs: "none", sm: "none" },
          flex: 0.2,
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            boxSizing: 'border-box',
            display: "flex",
            width: "100%",
            height: "60vh",
            bgcolor: "rgb(17, 29, 39)",
            borderRadius: 5,
            flexDirection: "column",
          }}
        >
          <Avatar
            sx={{
              mx: "auto",
              my: 2,
              bgcolor: "white",
              color: "black",
              fontWeight: 700,
            }}
          >
            {auth?.user?.name[0]}
            {auth?.user?.name.split(" ")[1][0]}
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a AI-ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You ask question related to anything. But avoid sharing personal
            information.
          </Typography>
          <Button
            sx={{
              width: "200px",
              my: "auto",
              color: "white",
              fontWeight: 700,
              borderRadius: 3,
              mx: "auto",
              bgcolor: red[400],
              ":hover": {
                bgcolor: red.A400,
              },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          boxSizing: "border-box",
          display: "flex",
          flexDirection: "column",
          flex: { md: 0.8, xs: 1, sm: 1 },
          width: "100%",
        }}
      >
        <Typography
          sx={{
            textAlign: "center",
            fontSize: "40px",
            fontWeight: 600,
            color: "white",
            mx: "auto",
            mb: 2,
            px: 3,
          }}
        >
          Model - GPT 3.5 Turbo
        </Typography>
        <Box
          sx={{
            boxSizing: "border-box",
            width: "100%",
            height: "60vh",
            borderRadius: 3,
            mx: "auto",
            display: "flex",
            flexDirection: "column",
            overflow: "scroll",
            overflowX: "hidden",
            overflowY: "auto",
            scrollBehavior: "smooth",
          }}
        >
          {chatMessages.map((chat, index) => (
            <ChatItem key={index} content={chat.content} role={chat.role} />
          ))}
        </Box>
        <div
          style={{
            boxSizing: 'border-box',
            width: "100%",
            padding: "20px",
            borderRadius: 8,
            backgroundColor: "rgb(17, 27, 39)",
            display: 'flex',
            margin: 'auto'
          }}
        >
          <input
            ref={inputRef}
            type="text"
            style={{
              width: "100%",
              backgroundColor: "transparent",
              padding: "10px",
              border: "none",
              outline: "none",
              color: "white",
              fontSize: "20px",
            }}
          />
          <IconButton sx={{ ml: 'auto', color: 'white' }}><IoMdSend /></IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
