import React from 'react'
import productsInfo from './productsInfo'
import { ProductCard } from '../components/index'
const filters = [
  'آبرسان',
  'ادو پرفیوم',
  'ژل شستشو',
  'کرم پودر',
  'کرم ضد آفتاب',
  'ماسک صورت',
  'مرطوب کننده',
]

const Products = () => {
  return (
    // این بخش قراره یه کامپونیت بشه
    <section className='grid grid-cols-[0.6fr,2fr] gap-x-4 px-6 '>
      <div>
        <input
          type='text'
          placeholder='جستجو...'
          className='input input-sm w-full pb-4'
        />
        <h2 className='font-bold text-neutral-600 text-xl'>
          دسته بندی محصولات
        </h2>
        <div className='py-4 flex flex-col gap-y-4'>
          {filters.map((filter, index) => {
            return (
              <div key={index} className='flex items-center gap-x-2'>
                <input type='checkbox' className='checkbox checkbox-md' />
                <span>{filter}</span>
              </div>
            )
          })}
        </div>
        <h2 className='font-bold text-neutral-600 text-xl pb-4'>
          فیلتر بر اساس قیمت
        </h2>
        <input
          type='range'
          min={0}
          max='100'
          value='10'
          className='range range-error'
        />
      </div>
      <div className='grid grid-cols-3 gap-x-6'>
        {productsInfo.map((product, index) => {
          return <ProductCard key={index} {...product} />
        })}
      </div>
    </section>
  )
}

export default Products
