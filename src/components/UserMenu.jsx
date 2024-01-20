import { useState, useContext, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserProvider';

function UserMenu({ initial }) {
    const { setUserLogin, setUSERID } = useContext(UserContext);
    const usrMenu = useRef(null);
    const [open, setOpen] = useState(false)
    const navigate = useNavigate();

    const handleOpen = () => {
        setOpen(!open)
    }

    const handleProfile = () => {
        navigate('/profile')
        handleOpen();
    }

    const handleLogout = () => {
        setUserLogin('')
        setUSERID('')
        navigate('/')
        handleOpen();
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            {
                open && !usrMenu.current.contains(e.target) &&
                    setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return (() => {
            document.removeEventListener('mousedown', handleOutsideClick)
        })
    }, [open, usrMenu])

    return (
        <div className='text-neutral-200 min-w-20 flex justify-center flex-col' ref={usrMenu}>
            <div className='flex items-center justify-center'>
                <button className='border-solid border-2 border-neutral-200 px-2 rounded-full bg-neutral-600 relative' onClick={handleOpen}>{initial}</button>
            </div>
            <div className='flex justify-center'>
                {open ?
                    <ul className='absolute mt-2 flex flex-col justify-center items-center py-4 bg-neutral-900 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl'>
                        <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={handleProfile}>Profile</button></li>
                        <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={handleLogout}>Logout</button></li>
                    </ul>
                    :
                    null}
            </div>
        </div>
    )
}

export default UserMenu;