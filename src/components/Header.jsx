import React from 'react'
import { FiPhoneCall, FiMapPin } from 'react-icons/fi'
import HeaderItem from './HeaderItem'
import Socialicons from './Socialicons'
const Header = () => {
  return (
    <header className='border-t-[12px] border-[#FF4D6D] px-10 py-4 w-[100vw] font-extrabold font-[BYekan]'>
      
      {/*Header Icon*/}
      <div className='absolute top-0 right-0 translate-y-[-125px] translate-x-[80px] -z-10'>
        <img src='https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/08/Central_Curve_shadow2-1.svg'
          alt='header image'
           />
        {/*Contacts info  */}

      </div >


      <div className=' flex flex-row items-center  justify-between '>

        <div className=''>
          <HeaderItem
            title={'فروشگاه زیوران'}
            title_color={'#FFFFFF'}
            subtitle={'توضیحات فروشگاه'}
            icon={<FiPhoneCall className='text-2xl text-[#FF4D6D]' />}
          />

        </div>

        <div className='flex flex-row w-[80%] justify-between items-center '>

          <div className='flex flex-row gap-[4rem] justify-between items-center '>

            <HeaderItem
              title_color={'#000'}
              subtitle={'فروشگاه زیوران'}
              title={'پشتیبانی:'}
              subtitle_color={'gray'}
              icon={<FiPhoneCall className='text-2xl text-[#FF4D6D]' />}
            />
            <HeaderItem
              title_color={'#000'}
              subtitle={'فروشگاه زیوران'}
              title={'آدرس فروشگاه:'}
              subtitle_color={'gray'}
              icon={<FiMapPin className='text-2xl text-[#FF4D6D]' />}
            />
          </div>

          <div>


            <Socialicons />

          </div>

        </div>

      </div>
    </header>
  )
}
export default Header
