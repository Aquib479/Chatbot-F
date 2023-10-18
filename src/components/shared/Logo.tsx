import React from 'react';
import { Link } from 'react-router-dom';

const Logo = () => {
    return (
        <>
            <div>
                <div className="flex items-center gap-4 mt-1">
                    <div className="image-logo">
                        <Link to='/'>
                            <img src="openai.png" alt="loading.." className='w-[2rem]' />
                        </Link>
                    </div>
                    <div className="content hidden md:block">
                        <p className='flex items-center font-bold text-[1.1rem] mt-[2px]'><span className='text-[1.4rem]'>AI</span>~CHATBOT</p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Logo;