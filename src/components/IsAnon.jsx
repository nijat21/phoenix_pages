import { useContext } from "react";
import { Navigate } from "react-router-dom";
import UserContext from "../context/UserProvider";
import LoaderFull from "./LoaderFull";

const IsAnon = props => {
    const { userLogged, loading } = useContext(UserContext);

    // if the authentication is still loading 
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <LoaderFull />
            </div>
        );
    }

    if (userLogged) {
        return <Navigate to={'/'} />;
    } else {
        return props.children;
    }
};

export default IsAnon;