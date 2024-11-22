import React from 'react'
import ProductCard from './ProductCard'

const Category_typeone = ({ title, products }) => {
  return (
    <div className='p-6 '>
      {/* عنوان دسته‌بندی */}
      <div className='mb-4'>
        <p className='text-sm text-gray-500'>{title}</p>
        <h2 className='text-xl font-bold text-gray-700'>
          <span className='text-[#FF4D6D]'>جدیدترین محصولات</span> فروشگاه
        </h2>
      </div>

      {/* لیست محصولات */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4'>
        {products.map((product, index) => (
          <ProductCard key={index} {...product} />
        ))}
      </div>
    </div>
  )
}

export default Category_typeone
