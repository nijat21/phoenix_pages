import { useState, useContext, useRef, useEffect } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserProvider';
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'

function UserMenu({ initial }) {
    const { logOutUser } = useContext(UserContext);
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
        logOutUser()
        navigate('/');
    }

    useEffect(() => {
        const handleOutsideClick = (e) => {
            {
                open && usrMenu.current && !usrMenu.current.contains(e.target) &&
                    setOpen(false)
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return (() => {
            document.removeEventListener('mousedown', handleOutsideClick)
        })
    }, [open, usrMenu])

    return (
        <div className='text-neutral-200 min-w-32 flex justify-center flex-col' ref={usrMenu}>
            <div className='flex items-center justify-center'>
                <button className='border-solid border-2 border-neutral-200 px-2 rounded-full bg-neutral-600 relative' onClick={handleOpen}>{initial}</button>
            </div>
            <div className='flex justify-center'>
                {open ?
                    <ul className='absolute mt-2 flex flex-col justify-center items-center py-4 bg-neutral-900 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl'>
                        <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={handleProfile}>Profile</button></li>
                        <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={handleLogout}>Logout</button></li>
                        <FormControl className='flex items-center mt-2'>
                            <FormLabel className='text-xs' mb='0'>
                                Dark mode
                            </FormLabel>
                            <Switch className='border-2 border-neutral-200 rounded-xl' colorScheme='neutral-900' />
                        </FormControl>
                    </ul>
                    :
                    null}
            </div>
        </div>
    )
}

export default UserMenu;