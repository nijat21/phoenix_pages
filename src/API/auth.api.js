import axios from "axios";
const baseURL = `${import.meta.env.VITE_BOOKS_API}/auth`;

// Signup
export const signup = (user) => {
    return axios.post(`${baseURL}/signup`, user);
};

// Login
export const login = (user) => {
    return axios.post(`${baseURL}/login`, user);
}


