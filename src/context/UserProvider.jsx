import { createContext, useState } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
    const [userLogin, setUserLogin] = useState("");
    const [USERID, setUSERID] = useState("");
    const [category, setCategory] = useState('');
    const [searchTitle, setSearchTitle] = useState('');

    return <UserContext.Provider value={{ userLogin, setUserLogin, USERID, setUSERID, category, setCategory, searchTitle, setSearchTitle }}>
        {children}
    </UserContext.Provider>
}

export default UserContext;