import axios from "axios";
import qs from "qs";
const baseUrl = `${import.meta.env.VITE_PP_API}/auth`;


export const signup = user => {
    return axios.post(`${baseUrl}/signup`, user);
};

// As the endpoint requires OAuth2PasswordForm, the data passed in req should be urlencoded
export const login = user => {
    const data = qs.stringify(user);
    return axios.post(`${baseUrl}/login`, data, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    });
};

// Verify the token 
export const verify = storedToken => {
    return axios.get(`${baseUrl}/verify`, {
        headers: {
            Authorization: `Bearer ${storedToken}`
        }
    });
};

const setAuthorizationHeaders = () => {
    // Axios method that intercepts with every methods 
    axios.interceptors.request.use(config => {
        // retrieving the token from local storage
        const token = localStorage.getItem('authToken');

        if (token) {
            config.headers = {
                Authorization: `Bearer ${token}`
            };
        }
        return config;
    });
};

setAuthorizationHeaders();

// // uploading profile photo
// export const uploadImg = async (image) => {
//     return axios.post(`${baseUrl}/upload`, image);
// };

// // Update user info with new photo
// export const updateImg = async (reqBody) => {
//     return axios.put(`${baseUrl}/updateImg`, reqBody);
// };

// // Edit User information => Change email and/or password
// export const updatePassword = (reqBody) => {
//     return axios.put(`${baseUrl}/updatePassword`, reqBody);
// };

// Update user email
export const updateEmail = ({ user_id, new_email, password }) => {
    const reqBody = { new_email, password };
    return axios.put(`${baseUrl}/updateEmail/${user_id}`, reqBody);
};

// Update user password
export const updatePass = ({ user_id, new_password, password }) => {
    const reqBody = { new_password, password };
    return axios.put(`${baseUrl}/updatePassword/${user_id}`, reqBody);
};

// Delete user and all bank accounts
export const deleteUser = async (user_id, password) => {
    return axios.delete(`${baseUrl}/deleteUser/${user_id}`, {
        data: {
            password: password
        }
    });
};
