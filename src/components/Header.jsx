import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'

const Header = () => {
  return (
    <header className='border-t-[12px] border-[#FF4D6D] px-10 py-4 w-[100vw] '>
      <div className='grid grid-cols-3 gap-12 items-center justify-between'>
        {/*Header Icon*/}
        <img
          src='https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/08/Central_Curve_shadow2-1.svg'
          alt='header image'
          className='absolute top-0 right-0 translate-y-[-125px] translate-x-[80px] -z-10'
        />
        {/*Contacts info  */}
        <div className='flex justify-start gap-10 col-span-2 '>
          <div className='flex flex-row items-end gap-2 mr-[-20px]  '>
            {/* Header text */}
            <FiPhoneCall className='text-4xl' />
            <p className='flex flex-col text-[16px] gap-1'>
              <span className='font-bold text-white'>فروشگاه زیوران</span>
              <span>توضیحات فروشگاه</span>
            </p>
          </div>
          <div className='flex flex-row items-end gap-2 '>
            {/*Contact details*/}
            <FiPhoneCall className='text-4xl' />
            <p className='flex flex-col '>
              <span>پشتیبانی:</span>
              <span>125-1234567</span>
            </p>
          </div>
          <div className='flex flex-row items-end gap-2 '>
            {/*Contact details*/}
            <FiPhoneCall className='text-4xl' />
            <p className='flex flex-col '>
              <span>آدرس فروشگاه:</span>
              <span>قم، خیابان امام</span>
            </p>
          </div>
        </div>
        <div className='justify-self-end'>
          <div>Social icons</div>
        </div>
      </div>
    </header>
  )
}
export default Header
