import React from 'react'
import ProductCard from './ProductCard'
import { NavLink } from 'react-router-dom'

const Category_typeone = ({ title, products, blackSubject, redSubject, slice, SubjectPose, bg_color }) => {
  return (
    <div className={bg_color + " " + "w-[100%] px-6 mb-20"} >
      <div className='pb-6 align-element  '>
        {/* عنوان دسته‌بندی */}

        {SubjectPose == 'center' ? (

          <div className='mb-4 items-center text-center flex flex-col pt-0 '>
            <img className='items-center' src="https://pre-websites.ir/elementor/cosmetic/wp-content/uploads/2022/12/sale-sec-bg-sep.png" alt="" />
            <div className='relative bottom-20 '>
              <h2 className='text-xl font-bold text-gray-700'>
                <span className='text-[#FF4D6D]'>{redSubject}</span>{" " + blackSubject}
              </h2>
              <p className='text-sm text-gray-500'>{title}</p>
            </div>
          </div>

        ) : (
          <div className='mb-4'>
            <p className='text-sm text-gray-500'>{title}</p>
            <div className='flex flex-row-reverse items-center justify-between'>
              <NavLink to={'products'} className="bg-pink-200 transition-all hover:bg-[#FF4D6D] p-3 rounded-full hover:text-white font-bold  text-red-500 text-sm mt-2">مشاهده محصولات</NavLink>

              <h2 className='text-xl font-bold text-gray-700'>
                <span className='text-[#FF4D6D]'>{redSubject}</span>{" " + blackSubject}
              </h2>
            </div>
          </div>)}


        {/* لیست محصولات */}
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 '>
          {products.slice(0, slice).map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

      </div>
    </div>
  )
}

export default Category_typeone
