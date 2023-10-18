import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { context } from '../context/AuthContext';
import ChatList from '../components/shared/ChatList';
import { IoSend } from "react-icons/io5";
import { ClearAllChats, getAllChats, sendChatRequest } from '../helpers/api';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
// import { TextToSpeechClient } from '@google-cloud/text-to-speech';

type Message = {
    role: string,
    content: string;
}

const Chat: React.FC = () => {
    const [chatMessage, setChatMessages] = useState<Message[]>([]);
    const [inputText, setInputText] = useState("");
    // const [outputAudio, setOutputAudio] = useState<string | null>(null);

    const authentication = context();
    const navigate = useNavigate();
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = async () => {
        setInputText("");
        const content = inputRef.current?.value as string;
        if (inputRef && inputRef.current) {
            inputRef.current.value = "";
        }
        const newMessage: Message = { role: "user", content }
        setChatMessages((prev) => [...prev, newMessage]);

        // send the api request
        const ChatData = await sendChatRequest(content);
        setChatMessages([...ChatData.chats]);
        // await convertToAudio(ChatData);

    };

    // function to convert text into audio using google cloud text-to-audio API
    // const convertToAudio = async (text: string) => {
    //     try {
    //         const textToSpeechClient = new TextToSpeechClient({
    //             keyFilename: 'path-to-your-service-account-key.json',
    //             projectId: 'ai-chatbot-402413',
    //         });
    //         const request = {
    //             input: { text },
    //             voice: { languageCode: 'en-US', name: 'en-US-Wavenet-D' },
    //             audioConfig: { audioEncoding: 'LINEAR16' as const },
    //         };

    //         const [response] = await textToSpeechClient.synthesizeSpeech(request);
    //         const audioBuffer = response.audioContent;

    //         // Convert audioBuffer to a format that can be played in the browser (e.g., base64)
    //         const base64Audio = Buffer.from(audioBuffer as Uint8Array).toString('base64');

    //         setOutputAudio(`data:audio/wav;base64,${base64Audio}`);
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }


    // function to clear all the conversation with the AI-Bot !!
    const handleClearConversationClick = async () => {
        try {
            toast.loading("Deleting..", { id: "deletechats" });
            await ClearAllChats();
            setChatMessages([]);
            toast.success("Chats Deleted Successfully!", { id: "deletechats" });
        } catch (error) {
            console.log(error);
            toast.error("Deletion failed!", { id: "deletechats" });
        }
    }

    useLayoutEffect(() => {
        // Load all the chats when the user logIn !!
        if (authentication?.isLoggedIn && authentication.user) {
            toast.loading("Loading chats..", { id: "loadchats" });
            getAllChats().then((data) => {
                setChatMessages([...data.chats]);
                toast.success("successfully loaded chats", { id: "loadchats" })
            }).catch(err => {
                console.log(err);
                toast.error("loading chats failed!", { id: "loadchats" });
            })
        }
    }, [authentication]);

    useEffect(() => {
        if (!authentication?.user) {
            return navigate('/login');
        }
    }, []);

    return (
        <div className='mt-[1rem] md:w-[98%] m-auto'>
            <div className='user-and-chats grid lg:grid-cols-5 gap-5 mx-2 md:mx-0 relative'>
                <article className='user h-[50vh] col-span-1 bg-[#202123] py-4 px-2 rounded-md hidden lg:block relative'>
                    <div className="flex flex-col items-center">
                        <figure className="avatar w-8 h-8 rounded-full bg-white text-black flex justify-center items-center font-semibold text-[0.9rem]">
                            <p>
                                {authentication?.user?.name[0]}
                                {authentication?.user?.name.split(" ")[1][0]}
                            </p>
                        </figure>
                        <p className='mt-4'>Welcome {authentication?.user?.name}</p>
                        <p className='text-center mt-4 text-[0.9rem]'>You are talking to ChatBot Master</p>
                        <p className='text-cente mt-8 text-[0.8rem]'>You can ask anything, on any topic related to Knowledege, Business, Advices, Education, etc. But avoid sharing personal information.</p>
                        <button type='button' className='absolute bottom-5 h-[2.5rem] w-[90%] m-auto bg-red-500 text-white rounded-md' onClick={handleClearConversationClick}>Clear Conversation</button>
                    </div>
                </article>
                <div className='chats w-full h-[90vh] col-span-4 bg-[#202123] rounded-md relative'>
                    <h1 className='content text-[1.8rem] tracking-[-1px] text-center py-2'>AI-ChatBot Master</h1>
                    <div className='mt-3 h-[70vh] overflow-auto text-[0.8rem] md:text-[1rem]'>
                        {
                            chatMessage.map((val, ind) => {
                                return <ChatList role={val.role} content={val.content} key={ind} />
                            })
                        }
                    </div>
                    <div className='absolute bottom-6 w-full'>
                        <div className="user-input relative">
                            <div className='md:w-[80%] w-[90%] m-auto bg-[#40414f] relative p-3 rounded-md input-shadow'>
                                <input type="text" value={inputText} ref={inputRef} placeholder='Send a message' className='text-[1rem] bg-transparent outline-none w-[95%]' onChange={(e) => setInputText(e.target.value)} />
                                <button className={`absolute right-4 bottom-4 text-[1.1rem] text-slate-500 ${inputText ? 'bg-green-500 py-[7px] px-[8px] rounded-md right-4 bottom-[0.54rem] text-white' : ''}`} onClick={handleClick}><IoSend /></button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    )
}

export default Chat