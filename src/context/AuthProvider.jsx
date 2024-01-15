import { createContext, useState } from "react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    const [username, setUsername] = useState({});

    return <AuthContext.Provider value={{ username, setUsername }}>
        {children}
    </AuthContext.Provider>
}

export default AuthContext;