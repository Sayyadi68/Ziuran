import React from "react";

const BlogCardForBlogPage = ({ imageSrc, date, title, description, onBackClick }) => {
  return (
    <div className="px-2 mb-3">

      <div className=" mx-auto h-[330px] rounded-lg shadow-md overflow-hidden border border-gray-200">
        {/* Image Section */}
        <div className="relative">
          <img
            src={imageSrc} // دریافت مسیر تصویر از طریق پراپس
            alt={title}
            className="w-full h-40 object-cover"
          />
          <button
            className="absolute top-2 left-2 bg-white p-2 rounded-full shadow-md"
            onClick={onBackClick} // هندلر برای کلیک روی دکمه
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 text-red-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 19.5L8.25 12l7.5-7.5"
              />
            </svg>
          </button>
        </div>

        {/* Content Section */}
        <div className="p-4 bg-white">
          <div className="flex justify-between items-center text-sm text-gray-500">
            <span>{date}</span>
            <span>🗓️</span>
          </div>
          <h3 className="mt-2 text-base font-semibold text-gray-800">{title}</h3>
          <p className="mt-1 text-sm text-gray-600">{description}</p>
        </div>
      </div>
      
    </div>
  );
};

export default BlogCardForBlogPage;
