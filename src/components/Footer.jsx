import React from "react";
import { Link } from "react-router-dom";
import { FaTelegram, FaInstagram } from "react-icons/fa";

import logo from "../assets/img/logo.png";
import percentIcon from "../assets/img/percent.png";
import shoppingIcon from "../assets/img/shopping.png";
import groupIcon from "../assets/img/Group.png";
import truckIcon from "../assets/img/truck.png";

// Replace with dynamic categories if needed
const headerCategories = [
  { name: "Category 1", url: "/category1" },
  { name: "Category 2", url: "/category2" },
  { name: "Category 3", url: "/category3" },
];

const Footer = () => {
  return (
    <footer className="bg-[#272727] text-[#BFBFBF] mt-20 pt-12 rounded-t-[12px]" dir="rtl">
      <div className="max-w-[1200px] mx-auto">
        {/* بخش آیکون‌ها */}
        <div id="fullWidthTabContent">
          <div
            className="p-4 md:p-8"
            id="stats"
            role="tabpanel"
            aria-labelledby="stats-tab"
          >
            <div className="grid gap-8 p-4 mx-auto text-gray-900 grid-cols-2 xl:grid-cols-4 dark:text-white sm:p-8">
              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <img className="w-[50px] h-[50px]" src={percentIcon} alt="" />
                <dt className="PeydaWeb text-md md:text-2xl font-extrabold text-black">
                  ضمانت کیفیت و قیمت کالا
                </dt>
                <dd className="IRANYekan text-xs sm:text-sm md:text-base text-gray-500">
                  کالاهای ارسالی با نازل ترین قیمت و بالا ترین کیفیت ممکن ارسال خواهند شد.
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <img className="w-[50px] h-[50px]" src={shoppingIcon} alt="" />
                <dt className="PeydaWeb text-md md:text-2xl font-extrabold text-black">
                  بسته بندی به بهترین شکل
                </dt>
                <dd className="IRANYekan text-xs sm:text-sm md:text-base text-gray-500">
                  با خرید از ما نگرانی درباره شکستن، پاره یا خراب شدن کالا خود نخواهید داشت.
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <img className="w-[50px] h-[50px]" src={groupIcon} alt="" />
                <dt className="PeydaWeb text-md md:text-2xl font-extrabold text-black">
                  پشتیبانی ۲۴ ساعته
                </dt>
                <dd className="IRANYekan text-xs sm:text-sm md:text-base text-gray-500">
                  پیگیری انتقادات و پیشنهادات از طریق راه های ارتباطی انتهای صفحه.
                </dd>
              </div>

              <div className="flex flex-col items-center justify-center gap-3 text-center">
                <img className="w-[50px] h-[50px]" src={truckIcon} alt="" />
                <dt className="PeydaWeb text-md md:text-2xl font-extrabold text-black">
                  تحویل سریع
                </dt>
                <dd className="IRANYekan text-xs sm:text-sm md:text-base text-gray-500">
                  ارسال کالای شما با پیک پیشتاز در سریع ترین زمان ممکن.
                </dd>
              </div>
            </div>
          </div>
        </div>

        {/* بخش لوگو و شبکه‌های اجتماعی */}
        <div className="flex flex-col md:flex-row items-center justify-between border-t border-[#3A3A3A] px-6 py-8 gap-6">
          <a href="/" className="flex items-center gap-3">
            <img src="/static/img/logo.png" className="h-20" alt="گراشل" />
            <span className="text-2xl font-semibold text-[#C5A253] YekanBakh">گراشل</span>
          </a>

          <div className="PeydaWeb flex flex-row items-center gap-3">
            <span className="text-[#C5A253]">در</span>
            <a
              href="#"
              className="bg-[#7B2C3F]/30 text-[#C5A253] w-10 h-10 flex items-center justify-center rounded-[10px] hover:bg-[#7B2C3F] transition"
            >
              <FaTelegram className="text-xl" />
            </a>
            <a
              href="#"
              className="bg-[#7B2C3F]/30 text-[#C5A253] w-10 h-10 flex items-center justify-center rounded-[10px] hover:bg-[#7B2C3F] transition"
            >
              <FaInstagram className="text-xl" />
            </a>
            <span className="text-[#C5A253]">همراه ما باشید!</span>
          </div>
        </div>

        {/* بخش درباره ما، صفحات و آدرس */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 px-6 py-10 border-t border-[#3A3A3A]">
          <div>
            <h2 className="text-[#C5A253] text-lg font-bold mb-4 PeydaWeb">درباره ما</h2>
            <p className="text-[#BFBFBF] text-sm leading-relaxed text-justify IRANYekan">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است.
            </p>
          </div>

          <div>
            <h2 className="text-[#C5A253] text-lg font-bold mb-4 PeydaWeb">صفحات دیگر</h2>
            <div className="IRANYekan flex flex-col gap-3">
              {["صفحه ۱", "صفحه ۲", "درباره ما"].map((page, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex items-center gap-2 hover:text-[#C5A253] transition"
                >
                  <svg
                    className="w-4 h-4 text-[#C5A253]"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <span className="text-[#BFBFBF] text-sm">{page}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[#C5A253] text-lg font-bold mb-4 PeydaWeb">آدرس</h2>
            <div className="w-full h-40 md:h-48 bg-[#3A3A3A] rounded-xl flex items-center justify-center text-[#BFBFBF] text-sm IRANYekan">
              نقشه یا تصویر آدرس
            </div>
          </div>
        </div>

        {/* بخش اینماد و تماس با ما */}
        <div className="flex flex-col md:flex-row-reverse items-center justify-between gap-6 p-4 md:p-8 border-t border-[#3A3A3A]">
          <div className="flex items-center gap-8">
            <div className="flex flex-col items-center">
              <a
                target="_blank"
                rel="noreferrer"
                // href="https://trustseal.enamad.ir/?id=655191&Code=0ohNiJWlBrimIVKNW4ULLJ3zPZ1F4XYf"
              >
                <img
                  // src="https://trustseal.enamad.ir/logo.aspx?id=655191&Code=0ohNiJWlBrimIVKNW4ULLJ3zPZ1F4XYf"
                  alt="eNAMAD"
                  style={{ cursor: "pointer" }}
                />
              </a>
              <span className="mt-1 text-xs text-[#BFBFBF]">eNAMAD</span>
            </div>
          </div>

          <div className="flex flex-col items-start text-[#BFBFBF]">
            <h2 className="text-lg font-semibold mb-2 text-[#C5A253] PeydaWeb">ارتباط با ما</h2>

            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#BFBFBF] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H8m0 0l4 4m-4-4l4-4" />
              </svg>
              <span className="text-sm IRANYekan">YourBusiness@gmail.com</span>
            </div>

            <div className="flex items-center mb-1">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#BFBFBF] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3a2 2 0 012 2v2h4V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2H8v2a2 2 0 01-2 2H3a2 2 0 01-2-2V5z" />
              </svg>
              <span className="text-sm IRANYekan">+98 912 560 7894</span>
            </div>

            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-[#BFBFBF] ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3a2 2 0 012 2v2h4V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2H8v2a2 2 0 01-2 2H3a2 2 0 01-2-2V5z" />
              </svg>
              <span className="text-sm IRANYekan">+021 3260 4554</span>
            </div>
          </div>
        </div>

        <div className="text-center py-6 border-t border-[#3A3A3A]">
          <small className="text-sm text-[#BFBFBF] IRANYekan">
            © {new Date().getFullYear()} گراشل — تمامی حقوق محفوظ است.
          </small>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
