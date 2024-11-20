import React from 'react'
import {
  FiHome,
  FiShoppingBag,
  FiBook,
  FiInfo,
  FiPhoneCall,
  FiUser,
  FiShoppingCart,
  FiSearch,
} from 'react-icons/fi'
import NavbarItem from './NavbarItem'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center  p-3'>
      <div className='flex flex-row gap-10'>
        <NavbarItem
          title={'خانه'}
          icon={
            <FiHome className='text-xl text-[#000] group-hover:text-[#FF4D6D] ' />
          }
          link={'home'}
        />
        <NavbarItem
          title={'فروشگاه'}
          icon={
            <FiShoppingBag className='text-xl text-[#000] group-hover:text-[#FF4D6D] ' />
          }
          link={'products'}
        />
        <NavLink to={'products'}>فروشگاه</NavLink>

        <NavbarItem
          title={'وبلاگ'}
          icon={
            <FiBook className='text-xl text-[#000] group-hover:text-[#FF4D6D] ' />
          }
          link={'home'}
        />
        <NavbarItem
          title={'درباره ما'}
          icon={
            <FiInfo className='text-xl text-[#000] group-hover:text-[#FF4D6D] ' />
          }
          link={'home'}
        />
        <NavbarItem
          title={'تماس با ما'}
          icon={
            <FiPhoneCall className='text-xl text-[#000] group-hover:text-[#FF4D6D] ' />
          }
          link={'home'}
        />
      </div>

      <div className='flex flex-row-reverse gap-5'>
        <NavbarItem
          title={''}
          icon={
            <FiUser className='text-xl text-[#000] group-hover:text-[gray] ' />
          }
          link={'home'}
        />
        <NavbarItem
          title={''}
          icon={
            <FiShoppingCart className='text-xl text-[#000] group-hover:text-[gray] ' />
          }
          link={'home'}
        />
        <NavbarItem
          title={''}
          icon={
            <FiSearch className='text-xl text-[#000] group-hover:text-[gray] ' />
          }
          link={'home'}
        />
      </div>
    </div>
  )
}

export default Navbar
