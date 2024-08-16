import axios from "axios";
const baseUrl = `${import.meta.env.VITE_PP_API}/auth`;

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