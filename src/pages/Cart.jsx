import React from "react";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, applyDiscount, removeFromCart } from "../redux/cartSlice";

const Cart = () => {
    const dispatch = useDispatch();
    const { products = [], discount } = useSelector((state) => state.cart);

    const handleQuantityChange = (id, type) => {
        if (type === "increment") {
            dispatch(incrementQuantity(id));
        } else if (type === "decrement") {
            dispatch(decrementQuantity(id));
        }
    };

    const handleApplyDiscount = () => {
        const code = prompt("کد تخفیف خود را وارد کنید:", discount);
        if (code) {
            dispatch(applyDiscount(code));
        }
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    //   const calculateTotal = () => {
    //     return products.reduce((total, product) => total + product.quantity * (product.newPrice || product.oldPrice), 0);
    //   };

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-10 w-full p-4 md:p-8 ">
            {products.length > 0 ? (
                <>
                    <div className="w-full h-full lg:w-[60%] p-4 md:p-6 bg-white shadow rounded-lg">
                        <div className="overflow-hidden">
                            <div className="md:hidden">
                                <div className="flex flex-col gap-4">
                                    {products.map((product) => (
                                        <div key={product.id} className="flex flex-col gap-4 border-b pb-4 mb-4">
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded"
                                                />
                                                <span className="truncate max-w-full">{product.name}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span>قیمت:</span>
                                                <span>{product.newPrice || product.oldPrice} تومان</span>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <span>تعداد:</span>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                                        onClick={() => handleQuantityChange(product.id, "decrement")}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="px-3 text-center border rounded bg-white">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                                        onClick={() => handleQuantityChange(product.id, "increment")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </div>
                                            {product.quantity === 1 && (
                                                <button
                                                    onClick={() => handleRemoveFromCart(product.id)}
                                                    className="mt-4 bg-red-500 text-white text-lg px-6 py-2 rounded-md hover:bg-red-600 transition-colors"
                                                >
                                                    حذف از سبد خرید
                                                </button>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <table className="hidden md:table w-full text-right border-collapse">
                                <thead>
                                    <tr className="bg-gray-100 border-b">
                                        <th className="py-2 px-4">محصول</th>
                                        <th className="py-2 px-4">قیمت</th>
                                        <th className="py-2 px-4">تعداد</th>
                                        <th className="py-2 px-4">عملیات</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {products.map((product) => (
                                        <tr key={product.id} className="border-b">
                                            <td className="py-3 px-4 flex items-center">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-12 h-12 rounded ml-2"
                                                />
                                                <span className="truncate max-w-[120px] md:max-w-none">{product.name}</span>
                                            </td>
                                            <td className="py-3 px-4">{product.newPrice || product.oldPrice} تومان</td>
                                            <td className="py-3 px-4">
                                                <div className=" w-24 flex text-center items-center justify-around align-middle px-2 py-1 border-[3px] rounded-lg gap-2" >
                                                    <button
                                                        className="text-xl font-medium text-gray-600"
                                                        onClick={() => handleQuantityChange(product.id, "decrement")}
                                                    >
                                                        -
                                                    </button>
                                                    <span className="text-xl font-medium text-gray-600">
                                                        {product.quantity}
                                                    </span>
                                                    <button
                                                        className="text-xl font-medium text-gray-600"
                                                        onClick={() => handleQuantityChange(product.id, "increment")}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                            </td>
                                            <td className="py-3 px-4">
                                                {product.quantity === 1 && (
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product.id)}
                                                        className="bg-red-500 text-white text-sm py-2 px-4 rounded hover:bg-red-600"
                                                    >
                                                        حذف
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                            <button
                                className="bg-[#FF4D6D] text-white px-4 py-2 rounded ml-2 hover:bg-pink-600"
                                onClick={handleApplyDiscount}
                            >
                                اعمال کد تخفیف
                            </button>
                        </div>
                    </div>
                    <div className="w-full h-full lg:w-[25%] mt-4 lg:mt-0 bg-white shadow rounded-lg p-4 md:p-6">
                        <div className="font-medium">
                            <p>جمع کل سبد خرید:</p>
                            <div className="flex justify-between items-center py-3 font-medium">
                                <p>جمع جزء :</p>
                                <span className="font-medium">3 تومان</span>
                            </div>
                            <div className="flex justify-between items-center py-3 font-medium border-t">
                                <p>مجموع :</p>
                                <span className="text-[#FF4D6D] font-medium">3 تومان</span>
                            </div>
                        </div>
                        <button className="bg-[#FF4D6D] text-white mt-4 px-6 py-3 rounded w-full hover:bg-pink-600">
                            ادامه جهت تسویه حساب
                        </button>
                    </div>
                </>
            ) : (
                <div className="w-full flex flex-col justify-center items-center gap-3 h-full lg:w-[60%] p-4 md:p-6 bg-white shadow rounded-lg">
                    <BsCartX className="text-[100px] text-gray-300" />
                    <h3 className="text-xl font-bold text-blue-900">سبد خرید شما در حال حاضر خالی است.</h3>
                    <h3 className="text-md font-medium text-gray-500">سبد خرید شما خالی است لطفا ابتدا از فروشگاه محصولاتی را به سبد خرید خود اضافه کنید</h3>
                    <Link to="/products" className="bg-[#FF4D6D] text-white p-3 rounded-lg">بازگشت به فروشگاه</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
