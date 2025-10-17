import React, { useState, useEffect, useCallback } from 'react';  
import { FaUser, FaShoppingBag, FaInstagram, FaSearch } from "react-icons/fa";
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


const PcHeader = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  const handleUserClick = () => {
    navigate(isAuthenticated ? "/account/dashboard" : "/login");
  };

  return (
    <header className="sticky top-0 z-50 w-full font-extrabold bg-black/40 backdrop-blur-md border-t-8 border-[#7B2C3F] px-4 md:px-10 pb-3 text-right shadow-lg transition-all duration-300" dir="ltr">
      {/* بالا: لوگو، جستجو و کاربر */}
      <div className="flex flex-col md:flex-row-reverse md:items-center justify-between gap-3">
        <a href="/" className="flex flex-row-reverse items-center gap-3 bg-[#7B2C3F]/70 backdrop-blur-sm p-3 rounded-b-[40px] flex-shrink-0">
          <img src="/static/img/logo.png" alt="گراشل" className="w-16 md:w-20" />
          <div>
            <h2 className="text-[#C5A253] text-lg font-bold YekanBakh">گراشل</h2>
            <p className="text-gray-300 text-sm md:text-base YekanBakh">فروشگاه آنلاین</p>
          </div>
        </a>

        <div className="flex-1 relative w-full md:max-w-xs" dir="rtl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="جستجو..."
            className="w-full bg-black/30 backdrop-blur-sm text-white placeholder-gray-400 px-4 py-2 rounded-full focus:outline-none focus:ring-2 focus:ring-[#C5A253] transition-all duration-300 YekanBakh"
          />
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"><FaSearch /></span>
        </div>

        <div className="flex gap-4 items-center md:gap-6 mt-2 md:mt-0 flex-shrink-0" dir="rtl">
          <button onClick={handleUserClick} className="text-[#C5A253] hover:text-[#D4AF37] transition-colors duration-300 flex items-center gap-1 YekanBakh">
            <FaUser className="text-xl" />
            <span className="text-sm">
              {isAuthenticated
                ? `${user?.first_name || ""} ${user?.last_name || ""}`.slice(0, 12) +
                  ((user?.first_name?.length || 0) + (user?.last_name?.length || 0) > 12 ? "..." : "")
                : "ورود / ثبت‌نام"}
            </span>
          </button>

          <a href="/app/basket" className="text-[#C5A253] hover:text-[#D4AF37] transition-colors duration-300">
            <FaShoppingBag className="text-xl" />
          </a>

          <a href="#" aria-label="Instagram" className="text-[#C5A253] hover:text-[#D4AF37] transition-colors duration-300">
            <FaInstagram className="text-2xl" />
          </a>
        </div>
      </div>

      <nav className="mt-4">
        <ul className="flex flex-wrap justify-center gap-4 md:gap-8">
          <li><a href="/" className="text-[#D4AF37] hover:text-[#800020] transition-colors duration-300 YekanBakh">خانه</a></li>
          <li><a href="/about/" className="text-[#D4AF37] hover:text-[#800020] transition-colors duration-300 YekanBakh">درباره ما</a></li>
        </ul>
      </nav>
    </header>
  );
};



const Header = () => {  
   
  return (  
    <>  
      <PcHeader />  
    </>  
  );  
};  

export default Header;