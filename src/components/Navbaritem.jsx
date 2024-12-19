import React from 'react'
import { NavLink } from 'react-router-dom'
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
const navbarItems = [
  {
    title: 'خانه',
    icon: <FiHome className='text-xl text-[#000] group-hover:text-[#FF4D6D]' />,
    link: '/',
  },
  {
    title: 'فروشگاه',
    icon: (
      <FiShoppingBag className='text-xl text-[#000] group-hover:text-[#FF4D6D]' />
    ),
    link: 'products',
  },
  {
    title: 'وبلاگ',
    icon: <FiBook className='text-xl text-[#000] group-hover:text-[#FF4D6D]' />,
    link: 'blog',
  },
  {
    title: 'درباره ما',
    icon: <FiInfo className='text-xl text-[#000] group-hover:text-[#FF4D6D]' />,
    link: 'about',
  },
  {
    title: 'تماس با ما',
    icon: (
      <FiPhoneCall className='text-xl text-[#000] group-hover:text-[#FF4D6D]' />
    ),
    link: 'contact',
  },
]
const navbarOptions = [
  {
    title: '',
    icon: <FiUser className='text-xl text-[#000] group-hover:text-[gray]' />,
    link: 'account',
  },
  {
    title: '',
    icon: (
      <FiShoppingCart className='text-xl text-[#000] group-hover:text-[gray]' />
    ),
    link: 'cart',
  },
  {
    title: '',
    icon: <FiSearch className='text-xl text-[#000] group-hover:text-[gray]' />,
    link: 'home',
  },
]

const NavbarItem = () => {
  return (
    <div className='flex flex-row justify-between items-center  p-3'>
      <div className='flex flex-row gap-10'>
        {navbarItems.map((item, index) => {
          const { link, title, icon } = item
          return (
            <NavLink
              key={index}
              to={link}
              className='flex flex-row items-end gap-2 group hover:text-[#FF4D6D] hover:transition-all transition-all'
            >
              {/* Header text */}
              {icon}
              <span className='flex flex-col text-[16px] gap-1 group-hover:text-[#FF4D6D] '>
                {title}
              </span>
            </NavLink>
          )
        })}
      </div>

      <div className='flex flex-row-reverse gap-5'>
        {navbarOptions.map((item, index) => {
          const { link, title, icon } = item
          return (
            <NavLink
              key={index}
              to={link}
              className='flex flex-row items-end gap-2 group hover:text-[#FF4D6D] hover:transition-all transition-all'
            >
              {/* Header text */}
              {icon}
              <span className='flex flex-col text-[16px] gap-1 group-hover:text-[#FF4D6D] '>
                {title}
              </span>
            </NavLink>
          )
        })}
      </div>
    </div>
  )
}

export default NavbarItem
