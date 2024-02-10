import { useContext } from "react";
import UserContext from "../context/UserProvider";

function LoaderAuthors() {
  const { theme } = useContext(UserContext);

  return (
    <div className='flex items-center justify-center w-screen h-96'>
      <div className={`loader ${theme} items-center`}>
        <div className="spinner" alt=''></div>
      </div>
    </div>
  );
}

export default LoaderAuthors;
