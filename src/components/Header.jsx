import React from 'react'

const Header = () => {
  return (
    <header>
      <div className="border border-t-[0.8rem] border-[#FF4D6D] before:absolute before:w-32 before:h-8 before:top-24 before:right-0 before:content-['فروشگاه-زیوران'] before:text-white before:bg-black"></div>
      <img
        src='https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/08/Central_Curve_shadow2-1.svg'
        alt='icon'
        className='absolute right-0 top-0 translate-y-[-39%] translate-x-[25%]'
      />
    </header>
  )
}
export default Header
