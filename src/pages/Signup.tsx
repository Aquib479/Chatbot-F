import React from 'react'
import InputBox from '../components/shared/InputBox';
import Button from '../components/shared/Button';
import { context } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Signup = () => {
    const authentication = context();

    // handle signup form submission
    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get('name') as string;
        const email = formData.get('email') as string;
        const password = formData.get('Password') as string;
        try {
            await authentication?.signup(name, email, password);
            toast.success('Signed Successfully!');
            // setTimeout(() => {
            //     window.location.href = '/login';
            // }, 1000);
        } catch (error) {
            toast.error("Sign Up Failed!");
        }
    }

    return (
        <>
            <div className='flex justify-center items-center pt-[3rem] md:pt-[4rem]'>
                <div className='w-full lg:grid grid-cols-2 lg:w-[80%] lg:m-auto md:mt-[5rem]'>
                    <div className='Image-robot hidden lg:flex justify-center items-center'>
                        <img src="airobot.png" alt="loading.." className='w-[400px] p-8' />
                    </div>
                    <div className='mx-2 md:p-4 md:mx-[4rem]'>
                        <div className='p-2 md:px-8 md:w-[90%] m-auto shadow'>
                            <h4 className='text-[1.5rem] md:text-[2rem] text-center font-semibold'>Sign-Up</h4>
                            <form className='md:mt-[2rem]' onSubmit={handleFormSubmit}>
                                <InputBox type='text' name='name' placeholder='Enter your name' label="Name" />
                                <InputBox type='email' name='email' placeholder='Enter your email' label="Email" />
                                <InputBox type='password' name='Password' placeholder='Enter your password' label="Password" />
                                <Button type='submit' name='SignUp' />
                                <button type="button" className="w-full block bg-white hover:bg-gray-100 focus:bg-gray-100 text-black font-semibold rounded-lg px-4 py-3 border border-gray-300 my-2 text-[0.8rem] md:text-[1rem] mt-4">
                                    <div className="flex items-center justify-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="w-6 h-6" viewBox="0 0 48 48"><defs><path id="a" d="M44.5 20H24v8.5h11.8C34.7 33.9 30.1 37 24 37c-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4C34.6 4.1 29.6 2 24 2 11.8 2 2 11.8 2 24s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z" /></defs><clipPath id="b"><use xlinkHref="#a" overflow="visible" /></clipPath><path clipPath="url(#b)" fill="#FBBC05" d="M0 37V11l17 13z" /><path clipPath="url(#b)" fill="#EA4335" d="M0 11l17 13 7-6.1L48 14V0H0z" /><path clipPath="url(#b)" fill="#34A853" d="M0 37l30-23 7.9 1L48 0v48H0z" /><path clipPath="url(#b)" fill="#4285F4" d="M48 48L17 24l-4-3 35-10z" /></svg>
                                        <span className="ml-4">Sign up with Google</span>
                                    </div>
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Signup