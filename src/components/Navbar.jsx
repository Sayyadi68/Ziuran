import React from 'react'

import NavbarItem from './NavbarItem'
import { NavLink } from 'react-router-dom'
const Navbar = () => {
  return (
    <div className='flex flex-row justify-between items-center  p-3'>
      <div className='flex flex-row gap-10'>
        <NavbarItem />
      </div>

      <div className='flex flex-row-reverse gap-5'>
        {/* <NavbarItem
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
        /> */}
      </div>
    </div>
  )
}

export default Navbar
