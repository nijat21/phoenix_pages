import { Link } from 'react-router-dom';

function FourOFour() {
    return (
        <div className="h-screen w-screen flex items-center justify-center">
            <div className='h-1/2 flex flex-col items-center justify-around z-0 place-items-center relative'>
                <h2 className='text-3xl'>Page not found!</h2>
                <i className="fa-regular fa-face-frown fa-10x"></i>
                <p>Go to the <Link to='/' className="font-bold text-blue-400">Homepage</Link>.</p>
            </div>
        </div>
    )
}

export default FourOFour;
