import React from "react";

const ProductCard = ({ image, name, category, oldPrice, newPrice, discount }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 text-center relative">
      {/* نشان تخفیف */}
      <span className="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
        -{discount}%
      </span>
      {/* تصویر محصول */}
      <img src={image} alt={name} className="w-24 h-24 mx-auto mb-4" />
      {/* اطلاعات محصول */}
      <h3 className="text-gray-700 font-semibold">{name}</h3>
      <p className="text-gray-500 text-sm">{category}</p>
      {/* قیمت‌ها */}
      <div className="mt-2">
        <p className="text-gray-400 line-through text-sm">{oldPrice} تومان</p>
        <p className="text-pink-500 font-bold">{newPrice} تومان</p>
      </div>
    </div>
  );
};

export default ProductCard;
