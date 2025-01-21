import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import products from '../pages/productsInfo'
import { addToCart, incrementQuantity, decrementQuantity, removeFromCart } from '../redux/cartSlice'

const SingleProduct = () => {
  const { id } = useParams()
  const [isFavorite, setIsFavorite] = useState(false)
  const dispatch = useDispatch()
  const cart = useSelector((state) => state.cart.products)

  const currentProduct = products.find((product) => product.id == id)

  if (!currentProduct) {
    return <h1 className="text-center text-xl font-bold mt-10">محصول یافت نشد</h1>
  }

  const { id: productId, oldPrice, newPrice, name, category, discount, image } = currentProduct

  const existingItem = cart.find((item) => item.id === productId)

  const handleAddToCart = () => {
    dispatch(addToCart(currentProduct))
  }

  const handleIncrement = () => {
    dispatch(incrementQuantity(productId))
  }

  const handleDecrement = () => {
    dispatch(decrementQuantity(productId))
  }

  const handleRemoveFromCart = () => {
    dispatch(removeFromCart(productId))
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      {/* Image Section */}
      <div className="shadow-md rounded-lg text-center relative cursor-pointer hover:drop-shadow-xl hover:transition-all">
        <span className="absolute right-2 bg-[#FF4D6D] text-white text-xs px-2 py-3 rounded-b-lg">
          {discount}%-  
        </span>
        <img
          src={image}
          alt={name}
          className="w-full h-full rounded-lg object-cover"
        />
      </div>

      {/* Product Details Section */}
      <div className="text-right">
        <h1 className="text-lg md:text-2xl font-bold mb-2">{name}</h1>
        <div className="rating flex  md:justify-start mb-4">
          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" defaultChecked />
          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
          <input type="radio" name="rating-2" className="mask mask-star-2 bg-orange-400" />
        </div>
        <p className="text-xl font-semibold text-green-600 mb-2">{newPrice} تومان</p>
        <p className="text-sm line-through text-gray-500 mb-4">{oldPrice} تومان</p>
        <ul className="list-disc list-inside text-gray-700 mb-6 text-sm md:text-base">
          <li>کشور مبداء برند: کره</li>
          <li>طراحی بسیار زیبا</li>
          <li>ضد آب</li>
          <li>ماندگاری 24 ساعته</li>
        </ul>
      </div>

      {/* Action Buttons Section */}
      <div className="flex flex-col items-center md:items-start">
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`flex items-center text-lg py-2 rounded-md transition-colors duration-300 ${isFavorite ? 'text-[#FF4D6D]' : 'text-gray-500'
            }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
          افزودن به علاقه مندی ها
        </button>

        {!existingItem ? (
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-blue-500 text-white text-lg px-6 py-2 rounded-md shadow-md hover:bg-blue-600 transition-colors"
          >
            افزودن به سبد خرید
          </button>
        ) : (
          <div className="flex flex-col items-center md:items-start mt-4">
            <div className="flex items-center">
              <button
                onClick={handleDecrement}
                className="bg-gray-300 text-lg px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                -
              </button>
              <span className="mx-4">{existingItem.quantity}</span>
              <button
                onClick={handleIncrement}
                className="bg-gray-300 text-lg px-4 py-2 rounded-md hover:bg-gray-400 transition-colors"
              >
                +
              </button>
            </div>
            {existingItem.quantity === 1 && (
              <button
                onClick={handleRemoveFromCart}
                className="mt-4 bg-red-500 text-white text-lg px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
              >
                حذف از سبد خرید
              </button>
            )}
          </div>
        )}
      </div>

    </div>
  )
}

export default SingleProduct
