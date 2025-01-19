import React, { useState } from 'react'
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
  'هوا کننده',

]

const Products = () => {
  const [products, setProducts] = useState(productsInfo)
  const [activeFilters, setActiveFilters] = useState([])
  const [priceRange, setPriceRange] = useState(500)

  // تبدیل اعداد فارسی به انگلیسی
  const convertPersianToEnglish = (price) => {
    const persianNumbers = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹']
    return parseInt(
      price
        .replace(/,/g, '')
        .split('')
        .map((char) =>
          persianNumbers.indexOf(char) !== -1
            ? persianNumbers.indexOf(char)
            : char
        )
        .join('')
    )
  }

  // فیلتر بر اساس دسته‌بندی
  const handleFilter = (category) => {
    let newActiveFilters
    if (activeFilters.includes(category)) {
      newActiveFilters = activeFilters.filter((filter) => filter !== category)
    } else {
      newActiveFilters = [...activeFilters, category]
    }
    setActiveFilters(newActiveFilters)

    // اعمال فیلترها
    applyFilters(newActiveFilters, priceRange)
  }

  // فیلتر بر اساس قیمت
  const handlePriceFilter = (e) => {
    const value = parseInt(e.target.value)
    setPriceRange(value)
    applyFilters(activeFilters, value)
  }

  // اعمال همه فیلترها
  const applyFilters = (categories, maxPrice) => {
    let filteredProducts = productsInfo

    // فیلتر دسته‌بندی
    if (categories.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        categories.some((cat) => product.category.includes(cat))
      )
    }

    // فیلتر قیمت
    filteredProducts = filteredProducts.filter((product) => {
      const price = convertPersianToEnglish(product.newPrice)
      return price <= maxPrice * 1000
    })

    setProducts(filteredProducts)
  }

  return (
    <section className='grid md:grid-cols-[0.6fr,2fr] gap-x-4 px-6 grid-cols-1'>
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
          {filters.map((filter, index) => (
            <div key={index} className='flex items-center gap-x-2'>
              <input
                type='checkbox'
                className='checkbox checkbox-md'
                checked={activeFilters.includes(filter)}
                onChange={() => handleFilter(filter)}
              />
              <span>{filter}</span>
            </div>
          ))}
        </div>
        <h2 className='font-bold text-neutral-600 text-xl pb-4'>
          فیلتر بر اساس قیمت
        </h2>
        <input
          type='range'
          min={0}
          max={500}
          value={priceRange}
          onChange={handlePriceFilter}
          className='range range-error mb-2'
        />
        <div className='text-sm text-gray-600 mb-4'>
          حداکثر قیمت: {priceRange * 1000} تومان
        </div>
      </div>
      <div className='grid md:grid-cols-2 gap-8 lg:grid-cols-3'>
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </section>
  )
}

export default Products
