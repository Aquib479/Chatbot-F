import axios from 'axios';

// Helper function for user signup
export const UserRegistration = async (name: string, email: string, password: string) => {
    const res = await axios.post('/user/register', { name, email, password });
    if (res.status !== 201) {
        throw new Error("Enter correct credentials");
    }
    const data = await res.data;
    return data;
}

// Helper function for user login
export const LoginUser = async (email: string, password: string) => {
    const res = await axios.post(`/user/login`, { email, password });
    if (res.status !== 200) {
        throw new Error("Unable to login");
    }
    const data = await res.data;
    return data;
}

// Helper function for user checking user credentials
export const checkUser = async () => {
    const res = await axios.get('/user/authenticate');
    if (res.status !== 200) {
        throw new Error("Unable to authenticate");
    }
    const data = await res.data;
    return data;
}

// Helper function to get the answer by the chatbot !!
export const sendChatRequest = async (message: string) => {
    const res = await axios.post('/chat/new', { message });
    if (res.status !== 200) {
        throw new Error("Unable to get any answer!");
    }
    const data = await res.data;
    return data;
}

// Helper function to get all the chats of user !!
export const getAllChats = async () => {
    const res = await axios.get('/chat/all-chat');
    if (res.status !== 200) {
        throw new Error("Unable to get any answer!");
    }
    const data = await res.data;
    return data;
}

// Helper function to clear all the conversation with the bot !!
export const ClearAllChats = async () => {
    const res = await axios.delete('/chat/delete');
    if (res.status !== 200) {
        throw new Error("Unable to delete chats!");
    }
    const data = await res.data;
    return data;
}

// Helper function to logout user !!
export const LogoutUserByDeletingToken = async () => {
    const res = await axios.get('/user/logout');
    if (res.status !== 200) {
        throw new Error("Unable to delete chats!");
    }
    const data = await res.data;
    return data;
}