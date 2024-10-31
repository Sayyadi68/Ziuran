import React from 'react'
import headerSvg from '../assets/react.svg'

const Header = () => {
  return (
    <header>
      <div className="p-[12px] bg-[#FF4D6D] before:z-[2] before:absolute before:right-[125px] before:top-[30px] before:content-['فروشگاه-زیوران'] before:text-white  ">

        <svg
          width='364'
          height='325'
          viewBox='0 0 364 325'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
          className='absolute right-0 top-0 translate-y-[-39%] inline-block'
        >
          <path
            d='M346.2 125.1V136.7H334.6C323.5 136.7 313.7 140.7 305.3 148.6C296.8 156.5 288.9 165.2 281.4 174.7C274 184.2 266.7 192.9 259.5 200.8C252.3 208.7 244.5 212.7 236.1 212.7H125.3C116.4 212.7 108.3 208.7 101.1 200.8C94 192.9 86.8 184.2 79.5 174.7C72.2 165.2 64.3 156.5 56 148.6C47.6 140.7 37.6 136.7 26.2 136.7H15.8V125.1H346.2Z'
            fill='#FF4D6D'
          />
        </svg>

      </div>


    </header>
  )
}
export default Header
