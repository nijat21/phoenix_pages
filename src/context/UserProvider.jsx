import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState("");
    const [USERID, setUSERID] = useState("");

    return <UserContext.Provider value={{ userLogin, setUserLogin, USERID, setUSERID }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;