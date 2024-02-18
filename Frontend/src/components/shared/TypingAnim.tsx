import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const TypingAnim = () => {
    return (
        <TypeAnimation
            sequence={[
                // Same substring at the start will only be typed once, initially
                'Chat with new AI',
                1000,
                'Built with OpenAI',
                1500,
                'New custemized ChatGPT',
                1500,
            ]}
            speed={50}
            style={{ fontSize: '2em', color: "white", display: "inline-block", textShadow: "1px 1px 20px #000" }}
            repeat={Infinity}
        />
    )
}

export default TypingAnim