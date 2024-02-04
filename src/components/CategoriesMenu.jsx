import { useState, useRef, useEffect, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserProvider';
import { motion as m } from "framer-motion";

function CategoriesMenu() {
  const catMenu = useRef(null);
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();
  const { category, setCategory } = useContext(UserContext);

  const handleOpen = () => {
    setOpen((prevOpen) => !prevOpen);
  }

  const handleCategoryClick = (cat) => {
    console.log(cat)
    setCategory(cat);
    setOpen(false)
    navigate('/books')
  }

  useEffect(() => {
    const handleOutsideClick = (e) => {
      {
        open && catMenu.current && !catMenu.current.contains(e.target) &&
          setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    }
  }, [open, catMenu])


  return (
    <div className='text-neutral-200 min-w-20 flex justify-center flex-col' ref={catMenu}>
      <div className='flex items-center justify-center'>
        <button className='relative' onClick={handleOpen}><h2>Categories</h2></button>
      </div>
      <div className='flex justify-center'>
        {open ?
          <m.ul initial={{ opacity: 0, y: "0%" }} animate={{ opacity: 1, y: '2.5%' }} transition={{ duration: 0.30, ease: "easeOut" }} exit={{ opacity: 0 }}
            className='absolute mt-2 flex flex-col justify-center items-center py-4 bg-neutral-900 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl min-w-32'>
            <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={() => handleCategoryClick('*')}>General</button></li>
            <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={() => handleCategoryClick('science')}>Science</button></li>
            <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={() => handleCategoryClick('crime')}>Crime</button></li>
            <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={() => handleCategoryClick('selfhelp')}>Self-help</button></li>
            <li className='hover:border-b hover:border-neutral-200 zoom-container'><button onClick={() => handleCategoryClick('poetry&subject:drama')}>Poetry and Drama</button></li>
          </m.ul>
          :
          null}
      </div>
    </div>
  )
}

export default CategoriesMenu;