import { useContext } from "react";
import UserContext from "../context/UserProvider";
import { Navigate } from "react-router-dom";
import LoaderFull from "./LoaderFull";

const IsPrivate = props => {
    const { isLoggedIn, isLoading } = useContext(UserContext);

    // if the authentication is still loading 
    if (isLoading) {
        return (
            <div className="h-screen w-screen flex justify-center items-center">
                <LoaderFull />
            </div>
        );
    }

    if (!isLoggedIn) {
        console.log("Not logged in");
        return <Navigate to={'/login'} />;
    } else {
        return props.children;
    }
};

export default IsPrivate;