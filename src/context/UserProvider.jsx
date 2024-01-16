import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState({});

    return <UserContext.Provider value={{ userLogin, setUserLogin }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;