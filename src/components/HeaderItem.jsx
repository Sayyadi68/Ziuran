import React from 'react'
const HeaderItem = ({ title, subtitle, icon }) => {
  return (
    <div className='flex flex-row items-end gap-2 mr-[-20px]  '>
      {/* Header text */}
      {icon}
      <p className='flex flex-col text-[16px] gap-1'>
        <span className='font-bold text-white'>{title}</span>
        <span>{subtitle}</span>
      </p>
    </div>
  )
}

export default HeaderItem
