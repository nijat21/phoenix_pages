import { useContext } from "react";
import UserContext from "../context/UserProvider";

function Loader() {
  const { theme } = useContext(UserContext);

  return (
    <div className='w-full h-screen relative top-0 flex justify-center items-center z-10'>
      <div className={`loader ${theme} items-center`}>
        <div className="spinner" alt=''></div>
      </div>
    </div>
  );
}

export default Loader;
