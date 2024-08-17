import axios from "axios";
const baseUrl = `${import.meta.env.VITE_PP_API}`;

const setAuthorizationHeaders = () => {
    // Axios method that intercepts with every methods 
    axios.interceptors.request.use(config => {
        // retrieving the token from local storage
        const token = localStorage.getItem('authToken');
        const excludeAuthHeaders = ["openlibrary.org"]; // Domain to exclude

        // Check if the request URL includes "openlibrary.org"
        const shouldExclude = excludeAuthHeaders.some(domain =>
            config.url.includes(domain)
        );

        if (token && !shouldExclude) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    });
};

setAuthorizationHeaders();

// Post books to read
export const addBooksToRead = (reqBody) => {
    return axios.post(`${baseUrl}/books-to-read`, reqBody);
};

// Get books to read
export const retrieveBooksToRead = ({ user_id }) => {
    return axios.get(`${baseUrl}/books-to-read/${user_id}`);
};

// Delete books to read
export const removeBooksToRead = (reqBody) => {
    return axios.delete(`${baseUrl}/books-to-read`, {
        data: reqBody
    });
};


// Post books to read
export const addBooksRead = (reqBody) => {
    return axios.post(`${baseUrl}/books-read`, reqBody);
};

// Get books to read
export const retrieveBooksRead = ({ user_id }) => {
    return axios.get(`${baseUrl}/books-read/${user_id}`);
};

// Delete books to read
export const removeBooksRead = (reqBody) => {
    return axios.delete(`${baseUrl}/books-read`, {
        data: reqBody
    });
};