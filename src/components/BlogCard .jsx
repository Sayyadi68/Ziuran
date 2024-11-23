import React from "react";

const BlogCard = ({ image, title, date, category, categoryColor }) => {
  return (
    <div className="relative bg-black rounded-xl overflow-hidden shadow-md">
      <img
        src={image}
        alt={title}
        className="w-full h-48 object-cover brightness-75"
      />
      <div className="absolute top-3 left-3">
        <span
          className={`px-3 py-1 text-sm font-medium text-white rounded-md ${categoryColor}`}
        >
          {category}
        </span>
      </div>
      <div className="absolute bottom-4 left-4 text-white space-y-1">
        <h3 className="text-lg font-bold">{title}</h3>
        <p className="text-sm text-gray-300">{date}</p>
      </div>
    </div>
  );
};

export default BlogCard;
