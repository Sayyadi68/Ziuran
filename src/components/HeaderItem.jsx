import React from 'react'
const HeaderItem = ({ title, subtitle, icon, title_color, subtitle_color }) => {
  return (
    <div className='flex flex-row items-end gap-2 mr-[-20px]  '>
      {/* Header text */}
      {icon}
      <p className='flex flex-col text-[16px] gap-1'>
        <span className='font-bold' style={{ color: title_color }}>{title}</span>
        <span style={{ color: subtitle_color }}>{subtitle}</span>
      </p>
    </div>
  )
}

export default HeaderItem
