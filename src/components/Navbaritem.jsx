import React from 'react'
const NavbarItem = ({ title, icon, link }) => {
  return (
    <a
      href={'http://localhost:5173/' + link}
      className='flex flex-row items-end gap-2 group hover:text-[#FF4D6D] hover:transition-all transition-all'
    >
      {/* Header text */}
      {icon}
      <span className='flex flex-col text-[16px] gap-1 group-hover:text-[#FF4D6D] '>
        {title}
      </span>
    </a>
  )
}

export default NavbarItem
