import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import products from '../pages/productsInfo'

const SingleProduct = () => {
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)

  const currentProduct = products.find((product) => product.id == id)

  if (!currentProduct) {
    return <h1>Product not found</h1>
  }

  const { oldPrice, newPrice, name, category, discount, image } = currentProduct

  return (
    <div className='grid grid-cols-3 gap-4 items-start p-6 gap-x-4'>
      <div className='bg-white shadow-md rounded-lg pb-4 text-center relative cursor-pointer hover:drop-shadow-xl hover:transition-all transition-all'>
        {/* نشان تخفیف */}
        <span className='absolute right-2 bg-[#FF4D6D] text-white text-xs px-2 py-4 rounded-b-lg'>
          {discount}%-
        </span>
        {/* تصویر محصول */}
        <img
          src={image}
          alt={name}
          className=' w-full h-50 mb-4 rounded-t-lg'
        />
      </div>
      <div>
        <h1 className='text-lg font-bold mb-2'>{name}</h1>
        <div className='rating flex mb-4'>
          <input
            type='radio'
            name='rating-2'
            className='mask mask-star-2 bg-orange-400'
          />
          <input
            type='radio'
            name='rating-2'
            className='mask mask-star-2 bg-orange-400'
            defaultChecked
          />
          <input
            type='radio'
            name='rating-2'
            className='mask mask-star-2 bg-orange-400'
          />
          <input
            type='radio'
            name='rating-2'
            className='mask mask-star-2 bg-orange-400'
          />
          <input
            type='radio'
            name='rating-2'
            className='mask mask-star-2 bg-orange-400'
          />
        </div>
        <p className='text-xl font-semibold text-green-600 mb-2'>
          {newPrice} تومان
        </p>
        <p className='text-sm line-through text-gray-500 mb-4'>
          {oldPrice} تومان
        </p>
        <ul className='list-disc list-inside text-gray-700 mb-6'>
          <li>کشور مبداء برند: کره</li>
          <li>طراحی بسیار زیبا</li>
          <li>ضد آب</li>
          <li>ماندگاری 24 ساعته</li>
        </ul>
      </div>
      <div className='flex flex-col items-center'>
        {/* افزودن به علاقه مندی ها */}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex items-center text-lg px-4 py-2 rounded-md transition-colors duration-300 ${
            isFavorite ? 'text-red-500' : 'text-gray-500'
          }`}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='currentColor'
            viewBox='0 0 24 24'
            className='w-6 h-6 mr-2'
          >
            <path d='M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z' />
          </svg>
          افزودن به علاقه مندی ها
        </button>

        {/* افزودن به سبد خرید */}
        <button className='mt-4 bg-blue-500 text-white text-lg px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors'>
          افزودن به سبد خرید
        </button>
      </div>
    </div>
  )
}

export default SingleProduct
