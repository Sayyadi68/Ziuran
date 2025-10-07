import React from "react";
import { Link } from "react-router-dom";

// Import your images
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
    <footer className="bg-white">
      <div className="mx-auto w-full">
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

        <div className="mx-auto w-full flex flex-wrap items-center justify-between px-16 pb-6">
          <Link to="/" className="flex items-center space-x-3 rtl:space-x-reverse">
            <img src={logo} className="h-8" alt="ققنوس شاپ" />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-zinc-700 YekanBakh">
              ققنوس شاپ
            </span>
          </Link>

          <div className="PeydaWeb flex flex-row items-center gap-3">
            <span className="text-zinc-700">در</span>
            <a
              href="#"
              className="bg-orange-200 text-orange-500 w-[40px] h-[40px] rounded-[8px] block text-center pt-2"
            >
              <i className="fa-brands fa-telegram text-[25px]"></i>
            </a>
            <a
              href="#"
              className="bg-orange-200 text-orange-500 w-[40px] h-[40px] rounded-[8px] block text-center pt-2"
            >
              <i className="fa-brands fa-instagram text-[25px]"></i>
            </a>
            <span className="text-zinc-700">همراه ما باشید!</span>
          </div>
        </div>

        <div className="mx-auto w-full grid grid-cols-1 gap-6 px-4 py-6 sm:grid-cols-2 sm:gap-8 sm:px-8 xl:grid-cols-3 md:px-16 lg:py-8">
          <div>
            <h2 className="PeydaWeb text-justify text-zinc-800 text-lg sm:text-xl mb-4 sm:mb-5">
              درباره ما
            </h2>
            <p className="IRANYekan text-justify text-zinc-700 text-sm sm:text-md">
              لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
              چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد
              نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته
              حال و آینده، شناخت فراوان جامعه و متخصصان را می طلبد.
            </p>
          </div>

          <div>
            <h2 className="PeydaWeb text-justify text-zinc-800 text-lg sm:text-xl mb-4 sm:mb-5">
              صفحات دیگر
            </h2>
            <div className="IRANYekan grid grid-flow-row gap-3 auto-rows-min">
              {headerCategories.map((cat) => (
                <Link
                  key={cat.name}
                  to={cat.url}
                  className="flex flex-row items-center gap-2"
                >
                  <svg
                    className="w-4 h-4 text-gray-800 dark:text-gray-800 rtl:rotate-180"
                    aria-hidden="true"
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
                  <span className="text-zinc-700 text-sm sm:text-md">{cat.name}</span>
                </Link>
              ))}

            </div>
          </div>

          <div>
            <h2 className="PeydaWeb text-justify text-zinc-800 text-lg sm:text-xl mb-4 sm:mb-5">
              آدرس
            </h2>
            <div className="IRANYekan w-full max-w-[400px] h-32 sm:h-40 md:h-48 bg-zinc-500 rounded-xl"></div>
          </div>
        </div>
      </div>

      <div className="container mx-auto flex flex-col md:flex-row-reverse items-center justify-between gap-6 p-4 md:p-8">
        <div className="flex items-center gap-8">
          <div className="flex flex-col items-center">
            <a
              referrerPolicy="origin"
              target="_blank"
              href="https://trustseal.enamad.ir/?id=655191&Code=0ohNiJWlBrimIVKNW4ULLJ3zPZ1F4XYf"
            >
              <img
                referrerPolicy="origin"
                src="https://trustseal.enamad.ir/logo.aspx?id=655191&Code=0ohNiJWlBrimIVKNW4ULLJ3zPZ1F4XYf"
                alt=""
                style={{ cursor: "pointer" }}
              />
            </a>
            <span className="mt-1 text-xs text-gray-600">eNAMAD</span>
          </div>
        </div>

        <div className="flex flex-col items-start text-gray-800">
          <h2 className="text-lg font-semibold mb-2">ارتباط با ما</h2>
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M16 12H8m0 0l4 4m-4-4l4-4"
              />
            </svg>
            <span className="text-sm">YourBusiness@gmail.com</span>
          </div>
          <div className="flex items-center mb-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3a2 2 0 012 2v2h4V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2H8v2a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"
              />
            </svg>
            <span className="text-sm">+98 912 560 7894</span>
          </div>
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-5 h-5 text-gray-500 ml-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3a2 2 0 012 2v2h4V5a2 2 0 012-2h3a2 2 0 012 2v14a2 2 0 01-2 2h-3a2 2 0 01-2-2v-2H8v2a2 2 0 01-2 2H3a2 2 0 01-2-2V5z"
              />
            </svg>
            <span className="text-sm">+021 3260 4554</span>
          </div>
        </div>
      </div>

      <div className="px-4 py-6 text-center">
        <small className="text-sm text-gray-500 dark:text-gray-300 sm:text-center">
          &copy; {new Date().getFullYear()} ققنوس شاپ. تمامی حقوق محفوظ است.
        </small>
      </div>
    </footer>
  );
};

export default Footer;
