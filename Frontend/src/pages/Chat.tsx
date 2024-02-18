import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Avatar, Box, Typography, Button, IconButton } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import red from "@mui/material/colors/red";
import { IoMdSend } from "react-icons/io"
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom"

import ChatItem from "../components/chat/ChatItem";
import { deleteUserChats, getUserChats, sendChatRequest } from "../helper/apiCommunicator";

type Message = {
  role: 'user' | 'assistant',
  content: string
}

const Chat = () => {
  const auth = useAuth();
  const navigate = useNavigate()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [chatMessages, setChatMessages] = useState<Message[]>([])

  const handleSubmit = async () => {
    const content = inputRef.current?.value as string
    console.log("🚀 ~ handleSubmit ~ content:", content)
    if (inputRef && inputRef.current) {
      inputRef.current.value = ""
    }
    const newMessage: Message = { role: 'user', content }
    setChatMessages((prev) => [...prev, newMessage])
    const chatData = await sendChatRequest(content)
    setChatMessages([...chatData.chats])
  }

  const handleDeleteChats = async () => {
    try {
      toast.loading("Deleting chats", { id: "deleteChats" })
      await deleteUserChats();
      setChatMessages([]);
      toast.success("Deleted Chats Successfully", { id: "deleteChats" })
    } catch (error) {
      console.log(error);
      toast.error("Deleting chats failed", { id: "deleteChats" })
    }
  }

  useEffect(() => {
    if (!auth?.user) {
      return navigate("/login")
    }
  }, [auth, navigate])

  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth?.user) {
      console.log('------------- userlayout ---------')
      toast.loading("Loading Chats", { id: "loadChats" })
      getUserChats().then((data) => {
        console.log("------------data --->", data)
        setChatMessages([...data.chats])
        toast.success("Chats loaded successfully", { id: "loadChats" })
      }).catch((err) => {
        console.log(err)
        toast.error("Unable to load chats", { id: "loadChats" })
      })
    }
  }, [auth])

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
            {auth?.user?.name?.split(" ")[1] ? auth?.user?.name?.split(" ")[1][0]: auth?.user?.name?.split("")[1] }
          </Avatar>
          <Typography sx={{ mx: "auto", fontFamily: "work sans" }}>
            You are talking to a AI-ChatBot
          </Typography>
          <Typography sx={{ mx: "auto", fontFamily: "work sans", my: 4, p: 3 }}>
            You ask question related to anything. But avoid sharing personal
            information.
          </Typography>
          <Button
            onClick={handleDeleteChats}
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
          <IconButton onClick={handleSubmit} sx={{ ml: 'auto', color: 'white' }}><IoMdSend /></IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
