import { Box } from '@mui/material'
import TypingAnim from '../components/shared/TypingAnim'

const Home = () => {
  return (
    <Box width={"100%"} height={"100%"}>
      <Box sx={{
        display: "flex",
        width: "100%",
        flexDirection: "column",
        alignItems: "center",
        mx: "auto",
        mt: 3
      }}>
        <Box>
          <TypingAnim />
        </Box>
        <Box sx={{
          width: "100%",
          display: "flex",
          flexDirection: {md: "row", xs: "column"},
          gap: 3,
          my: 10
        }}>
          <img src='aiRobot.png' alt='robot' style={{width:"300px", margin: "auto"}} />
          <img src='open-ai.png' alt='openai' className='image-inverted rotate' style={{width:"150px", margin: "auto"}}/>
        </Box>
      </Box>
    </Box>
  )
}

export default Home