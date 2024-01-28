import { Link } from "react-router-dom";

function FourOFour() {
    return (
        <div className='h-screen w-screen flex flex-col items-center justify-center mt-20 z-0'>
            <h2 className='text-3xl my-6'>Page is not found!</h2>
            <img src="/src/assets/not-found.png" alt="" className='w-44' />
            <p>Go to the <Link to='/' className="font-bold text-blue-400">Homepage</Link>.</p>
        </div>
    )
}

export default FourOFour;

