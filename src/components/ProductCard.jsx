import React from "react";

const ProductCard = ({ image, name, category, oldPrice, newPrice, discount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg pb-4 text-center relative cursor-pointer hover:drop-shadow-xl hover:transition-all transition-all">
      {/* نشان تخفیف */}
      <span className="absolute right-2 bg-[#FF4D6D] text-white text-xs px-2 py-4 rounded-b-lg">
        {discount}%-
      </span>
      {/* تصویر محصول */}
      <img src={image} alt={name} className="w-[100%] h-50 mb-4 rounded-t-lg" />
      {/* اطلاعات محصول */}
      <h3 className="text-gray-700 font-semibold">{name}</h3>
      <p className="text-gray-500 text-sm">{category}</p>
      {/* قیمت‌ها */}
      <div className="mt-2">
        <p className="text-gray-400 line-through text-sm">{oldPrice} تومان</p>
        <p className="text-[#FF4D6D] font-bold">{newPrice} تومان</p>
      </div>
    </div>
  );
};

export default ProductCard;
