import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const Animation = () => {
    return (
        <div>
            <TypeAnimation
                sequence={[
                    // Same substring at the start will only be typed out once, initially
                    'Chat With Your Own AI CHATBOT',
                    1000, // wait 1s before replacing "Mice" with "Hamsters"
                    'Built With OpenAI 🤖',
                    2000,
                    'Your Own Customized Chat GPT 💻',
                    1500
                ]}
                wrapper="span"
                speed={50}
                style={{ fontSize: '2em', display: 'inline-block' }}
                repeat={Infinity}
            />
        </div>
    )
}

export default Animation