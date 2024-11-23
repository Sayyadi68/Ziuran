import React from 'react';  
import {  
  FiHome,  
  FiShoppingBag,  
  FiBook,  
  FiInfo,  
  FiPhoneCall,  
  FiUser,  
  FiSearch,  
} from 'react-icons/fi';  
import { PhoneMenuItems } from '.';  

const PhoneMenu = ({ className }) => {  
  // تعریف آرایه‌ای از آیتم‌های منو  
  const menuItems = [  
    { title: 'صفحه اصلی', icon: <FiHome />, link: 'home' },  
    { title: 'فروشگاه', icon: <FiShoppingBag />, link: 'shop' },  
    { title: 'وبلاگ', icon: <FiBook />, link: 'blog' },  
    { title: 'درباره ما', icon: <FiInfo />, link: 'about' },  
    { title: 'تماس با ما', icon: <FiPhoneCall />, link: 'call' },  
    { title: 'ورود/ثبت‌نام', icon: <FiUser />, link: 'login' },  
  ];  

  return (  
    <div>  
      <aside className={`fixed h-[100%] w-[300px] bg-[#FFF] top-0 z-[20] ${className}`}>  
        <div className='flex items-center flex-row-reverse justify-between p-4 py-6 shadow-[0_4px_3px_0px_rgba(0,0,0,0.3)]'>  
          <FiSearch className='font-extrabold hover:cursor-pointer' />  
          <input  
            type='text'  
            id='small-input'  
            placeholder='جستجوی کالا'  
            className='border-0 font-extrabold font-[Byekan] text-gray-500 outline-none'  
          />  
        </div>  

        {/* رندر آیتم‌های منو از طریق متد map */}  
        {menuItems.map((item, index) => (  
          <PhoneMenuItems key={index} icon={item.icon} title={item.title} link={item.link} />  
        ))}  
      </aside>  
    </div>  
  );  
};  

export default PhoneMenu;