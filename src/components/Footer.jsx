import React from "react";
import { FaSync, FaShieldAlt, FaTh, FaUserClock, FaPhone, FaMailBulk, FaThumbtack } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="p-4 bg-gray-100 ">
            {/* بخش آمار بالا */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white shadow-lg rounded-lg p-4 mb-8">
                <div className="text-center">
                    <FaSync className="text-[#FF4D6D] text-3xl mx-auto" />
                    <p className="text-gray-500 mt-2">۹۸.۳٪</p>
                    <p className="text-gray-700">بدون مرجوعی</p>
                </div>
                <div className="text-center">
                    <FaShieldAlt className="text-[#FF4D6D] text-3xl mx-auto" />
                    <p className="text-gray-500 mt-2">+۴,۸۶۰</p>
                    <p className="text-gray-700">سفارش موفق</p>
                </div>
                <div className="text-center">
                    <FaTh className="text-[#FF4D6D] text-3xl mx-auto" />
                    <p className="text-gray-500 mt-2">۱۷ نوع</p>
                    <p className="text-gray-700">تنوع کالایی</p>
                </div>
                <div className="text-center">
                    <FaUserClock className="text-[#FF4D6D] text-3xl mx-auto" />
                    <p className="text-gray-500 mt-2">۷ سال</p>
                    <p className="text-gray-700">در کنار شما</p>
                </div>
            </div>

            {/* بخش لینک‌ها و اطلاعات */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-white shadow-lg rounded-lg p-4">
                <div>
                    <h3 className="text-[#000] text-xl font-extrabold font-[BYekan] mb-2"><span className="text-[#FF4D6D] mb-2">ارتباط</span> با ما</h3>
                    <p className="flex flex-row gap-2"><FaPhone className="text-[#FF4D6D] text-md" />تلفن:09123456789 </p>
                    <p className="flex flex-row gap-2"><FaMailBulk className="text-[#FF4D6D] text-md" />ایمیل: info@example.com</p>
                    <p className="flex flex-row gap-2"><FaThumbtack className="text-[#FF4D6D] text-md" />آدرس: تهران، خیابان ولیعصر، کوچه طراحان </p>
                </div>
                <div>
                    <h3 className="text-[#000] text-xl font-extrabold font-[BYekan] mb-2"><span className="text-[#FF4D6D] mb-2">خدمات</span> مشتریان</h3>
                    <ul>
                        <li>ثبت نام / ورود</li>
                        <li>پیگیری سفارش</li>
                        <li>پشتیبانی آنلاین</li>
                        <li>شکایات</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#000] text-xl font-extrabold font-[BYekan] mb-2"><span className="text-[#FF4D6D] mb-2">همکاری</span> با ما</h3>
                    <ul>
                        <li>همکاری در فروش</li>
                        <li>استخدام در شرکت</li>
                        <li>تامین محصولات</li>
                        <li>فرم همکاری</li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-[#000] text-xl font-extrabold font-[BYekan] mb-2"><span className="text-[#FF4D6D] mb-2">لینک‌های</span> مفید</h3>
                    <ul>
                        <li>صفحه اصلی</li>
                        <li>فروشگاه</li>
                        <li>درباره ما</li>
                        <li>تماس با ما</li>
                    </ul>
                </div>
            </div>

            <div className="mt-3">
                <div className="text-center">
                    <p className="mb-0 text-gray-800" dir='rtl'>
                        همه حقوق برای SHI_lera محفوظ است {new Date().getFullYear()} &copy;
                    </p>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
