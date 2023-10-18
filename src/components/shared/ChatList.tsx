import React, { useEffect, useState } from 'react'
import { context } from '../../context/AuthContext';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';


// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';

// function to extract codeSnippet from server response !!
function extractCodeSnippetFromString(message: string) {
    if (message.includes("```")) {
        const value = message.split("```");
        return value;
    }
}

// function to check wether response contains the code snippet or not 
// if it contains then extract code snippet function will run 
// otherwise it will simplu return the string 
function isCodeSnippet(str: string) {
    if (
        str.includes("=") ||
        str.includes(";") ||
        str.includes("[") ||
        str.includes("]") ||
        str.includes("{") ||
        str.includes("}") ||
        str.includes("#") ||
        str.includes("//")
    ) {
        return true;
    }
    return false;
}

type Props = {
    content: string,
    role: string,
}

const ChatList = (props: Props) => {
    const [language, setLanguge] = useState("javascript");
    const messageSnippet = extractCodeSnippetFromString(props.content);
    const authentication = context();

    // function to get the language for the code snippet
    function CodeLanguageSnippet(message: string) {
        setLanguge(message.split("\n")[0]);
    }

    useEffect(() => {
        const value = messageSnippet?.map(item => {
            return item[1];
        });
        // console.log(value);

    }, [messageSnippet])

    return props.role === 'user' ? (
        <>
            <div className="user_content flex items-center gap-5 bg-[#40414f] py-6 lg:px-[10rem] md:px-[4rem]">
                <div className="logo">
                    <figure className="avatar w-9 h-9 rounded-full bg-[#0e7490] text-white flex justify-center items-center font-semibold text-[0.9rem] flex-1">
                        <p>
                            {authentication?.user?.name[0]}
                            {authentication?.user?.name.split(" ")[1][0]}
                        </p>
                    </figure>
                </div>
                <div className="question flex-auto pt-[1px] text-[1rem] text-slate-300 leading-[1.7rem]">
                    {!messageSnippet && (<p>{props.content}</p>)}
                    {messageSnippet && messageSnippet.length &&
                        messageSnippet.map((item) => (
                            isCodeSnippet(item)
                                ?
                                <div className='w-[50vw] h-[50vh] my-4'>
                                    <SyntaxHighlighter style={vscDarkPlus} language={language}>
                                        {item}
                                    </SyntaxHighlighter>
                                </div>
                                :
                                <p>
                                    {item}
                                </p>
                        ))}
                </div>
            </div>
        </>
    ) : (
        <>
            <div className="bot_content flex gap-5 py-8 lg:px-[10rem] md:px-[4rem]">
                <div className="logo">
                    <figure className="avatar invert w-8 h-8 flex-auto">
                        <img src="openai.png" alt="flex-auto" />
                    </figure>
                </div>
                <div className="question flex-auto text-[1rem] text-slate-300 leading-[1.7rem] pr-4 md:pr-0">
                    {!messageSnippet && (<p>{props.content}</p>)}
                    {messageSnippet && messageSnippet.length &&
                        messageSnippet.map((item) => (
                            isCodeSnippet(item)
                                ?
                                <div className='lg:w-[50vw] md:[70vw] h-auto overflow-auto my-4'>
                                    <SyntaxHighlighter style={vscDarkPlus} language={"javascript"} className='border-2 border-slate-700 rounded-md bg-black'>
                                        {item}
                                    </SyntaxHighlighter>
                                </div>
                                :
                                <p>
                                    {item}
                                </p>
                        ))}
                </div>
            </div >
        </>
    )
}

export default ChatList