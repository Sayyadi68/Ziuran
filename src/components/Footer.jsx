import React from 'react';  
import { NavLink } from 'react-router-dom';  
import {  
  FaSync,  
  FaShieldAlt,  
  FaTh,  
  FaUserClock,  
  FaPhone,  
  FaMailBulk,  
  FaThumbtack,  
} from 'react-icons/fa';  
import Socialicons from './Socialicons';  

// آرایه‌ای برای آمار بالا  
const stats = [  
  { id: 1, icon: <FaSync className='text-[#FF4D6D] text-3xl mx-auto' />, value: '۹۸.۳٪', label: 'بدون مرجوعی' },  
  { id: 2, icon: <FaShieldAlt className='text-[#FF4D6D] text-3xl mx-auto' />, value: '+۴,۸۶۰', label: 'سفارش موفق' },  
  { id: 3, icon: <FaTh className='text-[#FF4D6D] text-3xl mx-auto' />, value: '۱۷ نوع', label: 'تنوع کالایی' },  
  { id: 4, icon: <FaUserClock className='text-[#FF4D6D] text-3xl mx-auto' />, value: '۷ سال', label: 'در کنار شما' },  
];  

// آرایه‌ای برای اطلاعات تماس  
const contactInfo = [  
  { id: 1, icon: <FaPhone className='text-[#FF4D6D] text-md' />, text: 'تلفن: 09123456789' },  
  { id: 2, icon: <FaMailBulk className='text-[#FF4D6D] text-md' />, text: 'ایمیل: info@example.com' },  
  { id: 3, icon: <FaThumbtack className='text-[#FF4D6D] text-md' />, text: 'آدرس: تهران، خیابان ولیعصر، کوچه طراحان' },  
];  

// آرایه‌ای برای خدمات مشتریان  
const customerServices = [  
  { name: 'ثبت نام / ورود', path: '/account' },  
  { name: 'پیگیری سفارش', path: '/order-tracking' },  
  { name: 'پشتیبانی آنلاین', path: '/support' },  
  { name: 'شکایات', path: '/complaints' },  
];  

// آرایه‌ای برای همکاری با ما  
const partnershipOpportunities = [  
  { name: 'همکاری در فروش', path: '/partnership/sales' },  
  { name: 'استخدام در شرکت', path: '/partnership/jobs' },  
  { name: 'تامین محصولات', path: '/partnership/suppliers' },  
  { name: 'فرم همکاری', path: '/partnership/form' },  
];  

// آرایه‌ای برای لینک‌های مفید  
const usefulLinks = [  
  { name: 'صفحه اصلی', path: '/' },  
  { name: 'فروشگاه', path: '/products' },  
  { name: 'درباره ما', path: '/about' },  
  { name: 'تماس با ما', path: '/contact' },  
];  

const Footer = () => {  
  return (  
    <footer className='p-4 bg-gray-100  mb-[70px] xl:mb-0'>  
      {/* بخش آمار بالا */}  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white shadow-lg rounded-lg p-4 mb-8'>  
        {stats.map(stat => (  
          <div key={stat.id} className='text-center'>  
            {stat.icon}  
            <p className='text-gray-500 mt-2'>{stat.value}</p>  
            <p className='text-gray-700'>{stat.label}</p>  
          </div>  
        ))}  
      </div>  

      {/* بخش لینک‌ها و اطلاعات */}  
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white shadow-lg rounded-lg p-4'>  
        <div>  
          <h3 className='text-[#000] text-xl font-extrabold font-[BYekan] mb-2'>  
            <span className='text-[#FF4D6D] mb-2'>ارتباط</span> با ما  
          </h3>  
          {contactInfo.map(info => (  
            <p key={info.id} className='mb-3 flex flex-row gap-2'>  
              {info.icon}  
              {info.text}  
            </p>  
          ))}  
        </div>  
        <div>  
          <h3 className='text-[#000] text-xl font-extrabold font-[BYekan] mb-2'>  
            <span className='text-[#FF4D6D] mb-2'>خدمات</span> مشتریان  
          </h3>  
          <ul>  
            {customerServices.map((service, index) => (  
              <li key={index} className='mb-3'>  
                <NavLink to={service.path} className='text-[#000] hover:underline'>  
                  {service.name}  
                </NavLink>  
              </li>  
            ))}  
          </ul>  
        </div>  
        <div>  
          <h3 className='text-[#000] text-xl font-extrabold font-[BYekan] mb-2'>  
            <span className='text-[#FF4D6D] mb-2'>همکاری</span> با ما  
          </h3>  
          <ul>  
            {partnershipOpportunities.map((opportunity, index) => (  
              <li key={index} className='mb-3'>  
                <NavLink to={opportunity.path} className='text-[#000] hover:underline'>  
                  {opportunity.name}  
                </NavLink>  
              </li>  
            ))}  
          </ul>  
        </div>  
        <div>  
          <h3 className='text-[#000] text-xl font-extrabold font-[BYekan] mb-2'>  
            <span className='text-[#FF4D6D] mb-2'>لینک‌های</span> مفید  
          </h3>  
          <ul>  
            {usefulLinks.map((link, index) => (  
              <li key={index} className='mb-3'>  
                <NavLink to={link.path} className='text-[#000] hover:underline'>  
                  {link.name}  
                </NavLink>  
              </li>  
            ))}  
          </ul>  
          <div className='justify-end w-100 flex'>  
            <Socialicons />  
          </div>  
        </div>  
      </div>  

      <div className='mt-3'>  
        <div className='text-center'>  
          <p className='mb-0 text-gray-800' dir='rtl'>  
            همه حقوق برای SHI_lera محفوظ است {new Date().getFullYear()} &copy;  
          </p>  
        </div>  
      </div>  
    </footer>  
  );  
};  

export default Footer;