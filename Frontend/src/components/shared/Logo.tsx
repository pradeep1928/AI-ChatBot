import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        marginRight: "auto",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <Link to={"/"}>
        <img
          src="open-ai.png"
          alt="openai"
          width={"30px"}
          height={"30px"}
          className="image-inverted"
        />
      </Link>
      <Typography
          sx={{
            display: { md: "block", sm: "block", xs: "none" },
            mr: "auto",
            fontWeight: "700",
            textShadow: "2px 2px 100px #000",
          }}
        > <span style={{fontSize: "20px"}}>MERN</span>-AI-CHATBOT
        </Typography>

    </div>
  );
};

export default Logo;
