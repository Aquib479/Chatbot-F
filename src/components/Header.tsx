import React from 'react';
import Logo from './shared/Logo';
import { context } from '../context/AuthContext';
import NavList from './shared/NavList';

const Header = () => {
    const auth = context();
    return (
        <>
            <nav>
                <div className='flex justify-between px-3 py-1'>
                    <div>
                        <Logo />
                    </div>
                    <div className='md:mt-2'>
                        {auth?.isLoggedIn ? (
                            <>
                                <NavList to='/chat' text='go to chat' />
                                <NavList to='/' text='logout' onClick={auth?.logout} />
                            </>
                        ) : (
                            <>
                                <NavList to='/login' text='Login' />
                                <NavList to='/register' text='SignUp' />
                            </>
                        )}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Header