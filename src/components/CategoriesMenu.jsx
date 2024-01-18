import { useState, useContext } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import UserContext from '../context/UserProvider';

function CategoriesMenu() {
  const [open, setOpen] = useState(false)
  const navigate = useNavigate();

  const handleOpen = () => {
    setOpen(!open)
  }

  const handleCategoryClick = (category) => {
    console.loge(`Selected category: ${category}`)
    handleOpen();
  }

  return (
    <div className='text-neutral-200 min-w-20 flex justify-center flex-col'>
      <div className='flex items-center justify-center'>
        <button className='relative' onClick={handleOpen}><h2>Categories</h2></button>
      </div>
      <div className='flex justify-center'>
        {open ?
          <ul className='absolute mt-2 flex flex-col justify-center items-center py-4 bg-neutral-900 backdrop-filter backdrop-blur-3xl px-3 border-solid border-2 border-neutral-200 rounded-xl'>
            <li><button onClick={handleCategoryClick}>General</button></li>
            <li><button onClick={handleCategoryClick}>Science</button></li>
            <li><button onClick={handleCategoryClick}>Crime</button></li>
            <li><button onClick={handleCategoryClick}>Self-help</button></li>
            <li><button onClick={handleCategoryClick}>Poetry and Drama</button></li>
          </ul>
          :
          null}
      </div>
    </div>
  )
}

export default CategoriesMenu;