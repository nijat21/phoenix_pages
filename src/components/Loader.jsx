import { useContext } from "react";
import UserContext from "../context/UserProvider";

function Loader() {
  const { theme } = useContext(UserContext);

  return (
    <div className='w-full h-3/4 relative top-0 flex justify-center items-center z-10'>
      <div className={`loader ${theme} items-center justify-center`}>
        <div className="spinner" alt=''></div>
      </div>
    </div>
  );
}

export default Loader;
