import React from 'react'
import { FiPhoneCall } from 'react-icons/fi'
import HeaderItem from './HeaderItem'
import Socialicons from './Socialicons'
const Header = () => {
  return (
    <header className='border-t-[12px] border-[#FF4D6D] px-10 py-4 w-[100vw] font-extrabold font-[BYekan]'>
      <div className='grid grid-cols-3 gap-12 items-center justify-between'>
        {/*Header Icon*/}
        <img
          src='https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/08/Central_Curve_shadow2-1.svg'
          alt='header image'
          className='absolute top-0 right-0 translate-y-[-125px] translate-x-[80px] -z-10'
        />
        {/*Contacts info  */}

        <div className='flex justify-start gap-10 col-span-2 '>
          <HeaderItem
            title={'فروشگاه زیوران'}
            subtitle={'توضیحات فروشگاه'}
            icon={<FiPhoneCall className='text-4xl' />}
          />
          <HeaderItem
            title={'فروشگاه زیوران'}
            subtitle={'پشتیبانی:'}
            icon={<FiPhoneCall className='text-4xl' />}
          />
          <HeaderItem
            title={'فروشگاه زیوران'}
            subtitle={'آدرس فروشگاه:'}
            icon={<FiPhoneCall className='text-4xl' />}
          />
        </div>
        <div className='justify-self-end'>
          <div>


            <Socialicons/>
 
          </div>
        </div>
      </div>
    </header>
  )
}
export default Header
