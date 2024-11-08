import React from 'react';
import { FaInstagram, FaTelegram } from 'react-icons/fa'

const Footer = () => {
    return (
        <footer dir="rtl" className="p-4 bg-gray-200 text-gray-800">
            <div>
                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/3 p-4">
                        <h5 className="text-gray-800">درباره ما</h5>
                        <p className="text-gray-800">
                            ما یک شرکت پیشرو در ارائه خدمات با کیفیت به مشتریان هستیم. هدف ما ارائه بهترین تجربه ممکن به شماست.
                        </p>
                    </div>

                    <div className="md:w-1/3 p-4">
                        <h5 className="text-gray-800">لینک‌های مفید</h5>
                        <div className="flex flex-col">
                            <a href="#home" className="text-[#FF4D6D] ps-3 ">خانه</a>
                            <a href="#about" className="text-[#FF4D6D] ps-3 ">درباره ما</a>
                            <a href="#services" className="text-[#FF4D6D] ps-3 ">خدمات</a>
                            <a href="#contact" className="text-[#FF4D6D] ps-3 ">تماس با ما</a>
                        </div>
                    </div>

                    <div className="md:w-1/3 p-4">
                        <h5 className="text-gray-800">تماس با ما</h5>
                        {/* <p className="text-gray-800">آدرس: خیابان اصلی، شهر نمونه، کشور</p>   */}
                        <p className="text-gray-800">تلفن: 09207062003</p>
                        <p className="text-gray-800">ایمیل: test@gmail.com</p>
                        <br />
                        <h5 className="text-gray-800">ما را در شبکه‌های اجتماعی دنبال کنید</h5>

                        <div className='flex gap-2 mt-2'>

                            <a href="#" className="text-red-600 ">
                                <FaInstagram />
                            </a>
                            <a href="#" className="me-2 text-blue-600 ">
                                <FaTelegram />
                            </a>
                            <a href="#" className="me-2 text-orange-600 ">
                                other logo
                            </a>

                        </div>

                    </div>
                </div>
                <div className="mt-3">
                    <div className="text-center">
                        <p className="mb-0 text-gray-800" dir='rtl'>
                            همه حقوق برای SHI_lera محفوظ است {new Date().getFullYear()} &copy;
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;