import { ReactNode, createContext, useContext, useEffect, useState } from "react";
import { LoginUser, LogoutUserByDeletingToken, UserRegistration, checkUser } from "../helpers/api";

type User = {
    name: string,
    email: string,
}
type UserAuth = {
    isLoggedIn: boolean,
    user: User | null,
    login: (email: string, password: string) => Promise<void>;
    signup: (name: string, email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}
const AuthContext = createContext<UserAuth | null>(null);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // fetch wether user cookies are valid then user should not login 
    // if user cookies are not valid then user should login 
    // an effect function to check for the user cookies 
    useEffect(() => {
        async function checkUserStatus() {
            const data = await checkUser();
            if (data) {
                setUser({ email: data.email, name: data.name });
                setIsLoggedIn(true);
            }
        }
        checkUserStatus();
    }, []);

    // context for usre login
    const login = async (email: string, password: string) => {
        const data = await LoginUser(email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
            setIsLoggedIn(true);
        }
    };

    // context for user signup
    const signup = async (name: string, email: string, password: string) => {
        const data = await UserRegistration(name, email, password);
        if (data) {
            setUser({ email: data.email, name: data.name });
        }
    };

    //context for user logout
    const logout = async () => {
        await LogoutUserByDeletingToken();
        setIsLoggedIn(false)
        setUser(null);
        window.location.reload();
    };

    const value = {
        user,
        isLoggedIn,
        login,
        logout,
        signup,
    };

    // Auth context provider 
    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

// create a context that should be used by user
export const context = () => useContext(AuthContext);