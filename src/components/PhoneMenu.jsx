import React from 'react'
import {
  FiHome,
  FiShoppingBag,
  FiBook,
  FiInfo,
  FiPhoneCall,
  FiUser,
  FiSearch,
} from 'react-icons/fi'
import { PhoneMenuItems } from '.'

const PhoneMenu = ({className}) => {
  return (
    <aside className={'fixed h-[100%] w-[300px] bg-[#FFF] z-[20] top-0 ' +  className  }>
      <div className='flex items-center flex-row-reverse justify-between p-4 py-6 shadow-[0_4px_3px_0px_rgba(0,0,0,0.3)]'>
        <FiSearch className='font-extrabold hover:cursor-pointer' />
        <input
          type='text'
          id='small-input'
          placeholder='جستجوی کالا'
          className='border-0 font-extrabold font-[Byekan] text-gray-500 outline-none'
        />
      </div>

      <PhoneMenuItems icon={<FiHome />} title={'صفحه اصلی'} link={'home'} />

      <PhoneMenuItems
        title={'فروشگاه'}
        icon={<FiShoppingBag />}
        link={'shop'}
      />
      <PhoneMenuItems title={'وبلاگ'} icon={<FiBook />} link={'blog'} />
      <PhoneMenuItems title={'درباره ما'} icon={<FiInfo />} link={'about'} />
      <PhoneMenuItems
        title={'تماس با ما'}
        icon={<FiPhoneCall />}
        link={'call'}
      />
      <PhoneMenuItems
        title={'ورود/ثبت‌ نام'}
        icon={<FiUser />}
        link={'login'}
      />
    </aside>
  )
}
export default PhoneMenu
