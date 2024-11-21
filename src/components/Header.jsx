import React, { useState, useEffect, useCallback, useRef } from 'react';
import { FiPhoneCall, FiMapPin } from 'react-icons/fi';
import HeaderItem from './HeaderItem';
import Socialicons from './Socialicons';
import { Navbar, PhoneMenu } from '../components';

const PcHeader = () => {
  return (
    <>
      <header className='border-t-[12px] border-[#FF4D6D] px-10 py-4 w-[100%] font-extrabold font-[BYekan]'>
        <div className='absolute top-0 right-0 translate-y-[-125px] translate-x-[80px] -z-10'>
          <img
            src='https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/08/Central_Curve_shadow2-1.svg'
            alt='header image'
          />
        </div>

        <div className='flex flex-row items-center justify-between'>
          <HeaderItem
            title={'فروشگاه زیوران'}
            title_color={'#FFFFFF'}
            subtitle={'فروشگاه زیبا رویان'}
            icon={<FiPhoneCall className='text-2xl text-[#FF4D6D]' />}
          />
          <div className='flex flex-row w-[80%] justify-between items-center'>
            <div className='flex flex-row gap-[4rem]'>
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
            <Socialicons />
          </div>
        </div>
      </header>
      <Navbar />
    </>
  );
};

const PhoneHeader = () => {  
  const [showPhoneMenu, setShowPhoneMenu] = useState(false);  

  const handleShow = () => {  
    setShowPhoneMenu(true);  
  };  

  const handleClose = () => {  
    setShowPhoneMenu(false);  
  };  


  return (  
    <>  
      <div className="navbar bg-base-100 shadow-[0_4px_3px_0px_rgba(0,0,0,0.3)]">  
        <div className="navbar-start">  
          <div className="dropdown">  
            <div className="btn btn-ghost btn-circle" onClick={handleShow}>  
              <svg  
                xmlns="http://www.w3.org/2000/svg"  
                className="h-5 w-5"  
                fill="none"  
                viewBox="0 0 24 24"  
                stroke="currentColor">  
                <path  
                  strokeLinecap="round"  
                  strokeLinejoin="round"  
                  strokeWidth="2"  
                  d="M4 6h16M4 12h16M4 18h7"  
                />  
              </svg>  
            </div>  
          </div>  
        </div>  
        <div className="navbar-center">  
          <a className="btn btn-ghost text-xl">daisyUI</a>  
        </div>  
        <div className="navbar-end">  
          <button className="btn btn-ghost btn-circle" onClick={handleShow}>  
            <svg  
              xmlns="http://www.w3.org/2000/svg"  
              className="h-5 w-5"  
              fill="none"  
              viewBox="0 0 24 24"  
              stroke="currentColor">  
              <path  
                strokeLinecap="round"  
                strokeLinejoin="round"  
                strokeWidth="2"  
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"  
              />  
            </svg>  
          </button>  
        </div>  
      </div>  

      {showPhoneMenu && (  
        <div className="fixed inset-0 bg-[#c0c0c069] z-[20]" onClick={handleClose}></div>  
      )}  

      <PhoneMenu className={showPhoneMenu ? "transition translate-x-0" : "block z-50 translate-x-[300px] transition ease-in-out delay-150 duration-300"} />  
    </>  
  );  
};  

const Header = () => {
  const [isWide, setIsWide] = useState(window.innerWidth > 1100);

  const handleResize = useCallback(() => {
    setIsWide(window.innerWidth > 1100);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <>
      {isWide ? <PcHeader /> : <PhoneHeader />}
    </>
  );
};

export default Header;