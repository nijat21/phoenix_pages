import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserProvider';

function DropDown({ initial }) {
    const { setUserLogin, setUSERID } = useContext(UserContext);

    const [open, setOpen] = useState(false)

    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleProfile = () => {
        navigate('/profile')
    }
    const handleMyBooks = () => {
        navigate('/mybooks')
    }
    const handleLogout = () => {
        setUserLogin('')
        setUSERID('')
        navigate('/')
    }

    return (
        <div className='text-neutral-200 min-w-20 flex justify-center flex-col'>
            <div className='flex items-center justify-center'>
                <button className='border-solid border-2 border-neutral-200 px-2 rounded-full bg-neutral-600 relative' onClick={handleOpen}>{initial}</button>
            </div>
            <div className='flex justify-center'>
                {open ?
                    <ul className='absolute mt-2 flex flex-col justify-center items-center py-4 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl'>
                        <li><button onClick={handleProfile}>Profile</button></li>
                        <li><button onClick={handleMyBooks}>My Books</button></li>
                        <li><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                    :
                    null}
            </div>
        </div>
    )
}

export default DropDown