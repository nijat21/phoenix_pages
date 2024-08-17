import { useContext } from "react";
import UserContext from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import LoaderFull from "./LoaderFull";

const IsPrivate = props => {
    const { userLogged, loading } = useContext(UserContext);

    // if the authentication is still loading 
    if (loading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <LoaderFull />
            </div>
        );
    }

    if (!userLogged) {
        console.log("Not logged in");
        return <Navigate to={'/login'} />;
    } else {
        return props.children;
    }
};

export default IsPrivate;