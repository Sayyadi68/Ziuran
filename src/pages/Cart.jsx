import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, incrementQuantity, applyDiscount, removeFromCart } from "../redux/cartSlice";
import UserLocations from '../components/UserAddress';
import { FaPlus, FaMinus, FaTrash, FaCreditCard } from "react-icons/fa";

const Cart = () => {
    const dispatch = useDispatch();
    const { products = [], discount } = useSelector((state) => state.cart);
    const [discountCode, setDiscountCode] = useState(discount || "");

    const handleQuantityChange = (id, type) => {
        if (type === "increment") dispatch(incrementQuantity(id));
        else if (type === "decrement") dispatch(decrementQuantity(id));
    };

    const handleApplyDiscount = () => {
        if (discountCode) dispatch(applyDiscount(discountCode));
        else alert("لطفا کد تخفیف را وارد کنید");
    };

    const handleRemoveFromCart = (id) => {
        dispatch(removeFromCart(id));
    };

    const parsePrice = (price) =>
        Number(price.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[^\d]/g, ""));
    const formatPrice = (num) => num.toLocaleString("fa-IR").replace(/٬/g, ",");

    const subtotal = products.reduce(
        (sum, product) => sum + parsePrice(product.newPrice) * product.quantity,
        0
    );

    const totalDiscount = products.reduce(
        (sum, product) =>
            sum + Math.round((parsePrice(product.oldPrice) - parsePrice(product.newPrice)) * product.quantity),
        0
    );

    const shippingCost = 25000;
    const totalPayable = subtotal + shippingCost;

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full p-4 md:p-8">
            {products.length > 0 ? (
                <>
                    {/* بخش سبد خرید */}
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <UserLocations />

                        <div className="bg-[#272727] rounded-xl p-6 md:p-8">
                            <h2 className="text-lg font-bold text-white mb-4 font-[Byekan]">سبد محصولات</h2>

                            {/* موبایل و تبلت */}
                            <div className="md:hidden flex flex-col gap-4">
                                {products.map((product) => (
                                    <div key={product.id} className="flex flex-col gap-2 border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={product.image} alt={product.name} className="w-14 h-14 rounded" />
                                            <span className="truncate text-[#C5A253]">{product.name}</span>
                                        </div>

                                        <div className="flex justify-between text-white">
                                            <span>قیمت اصلی:</span>
                                            <span>{formatPrice(parsePrice(product.oldPrice))} تومان</span>
                                        </div>

                                        <div className="flex justify-between text-white">
                                            <span>قیمت با تخفیف:</span>
                                            <span>{formatPrice(parsePrice(product.newPrice))} تومان</span>
                                        </div>

                                        <div className="flex justify-between items-center">
                                            <span className="text-white">تعداد:</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="text-[#C5A253]"
                                                    onClick={() => handleQuantityChange(product.id, "increment")}
                                                >
                                                    <FaPlus />
                                                </button>

                                                <span className="text-xl text-[#C5A253]">{product.quantity}</span>

                                                {product.quantity === 1 ? (
                                                    <button
                                                        onClick={() => handleRemoveFromCart(product.id)}
                                                        className="text-[#C5A253] text-xl"
                                                        title="حذف محصول"
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                ) : (
                                                    <button
                                                        className="text-[#C5A253]"
                                                        onClick={() => handleQuantityChange(product.id, "decrement")}
                                                    >
                                                        <FaMinus />
                                                    </button>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* دسکتاپ */}
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-[#353535] text-white border-b">
                                            <th className="py-2 px-4">محصول</th>
                                            <th className="py-2 px-4">قیمت اصلی</th>
                                            <th className="py-2 px-4">قیمت با تخفیف</th>
                                            <th className="py-2 px-4">تعداد</th>
                                            <th className="py-2 px-4">قیمت کل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {products.map((product) => (
                                            <tr key={product.id} className="border-b">
                                                <td className="py-3 px-4 flex items-center gap-2">
                                                    <img src={product.image} alt={product.name} className="w-12 h-12 rounded" />
                                                    <span className="truncate text-[#C5A253]">{product.name}</span>
                                                </td>
                                                <td className="py-3 px-4 text-white">{formatPrice(parsePrice(product.oldPrice))} تومان</td>
                                                <td className="py-3 px-4 text-white">{formatPrice(parsePrice(product.newPrice))} تومان</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button onClick={() => handleQuantityChange(product.id, "increment")} className="text-[#C5A253]"><FaPlus /></button>
                                                        <span className="text-[#C5A253]">{product.quantity}</span>
                                                        {product.quantity === 1 ? (
                                                            <button onClick={() => handleRemoveFromCart(product.id)} className="text-[#C5A253]"><FaTrash /></button>
                                                        ) : (
                                                            <button onClick={() => handleQuantityChange(product.id, "decrement")} className="text-[#C5A253]"><FaMinus /></button>
                                                        )}
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-white">{formatPrice(parsePrice(product.newPrice) * product.quantity)} تومان</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* خلاصه پرداخت */}
                    <div className="w-full lg:w-1/3 bg-[#272727] rounded-2xl p-5 text-white flex-shrink-0 h-full">
                        <div className="flex flex-col gap-4 font-medium ">
                            <p className="text-xl font-semibold text-[#C5A253] mb-2">جمع کل</p>

                            <div className="flex justify-between text-sm md:text-base">
                                <span className="text-gray-300">قیمت اصلی کالا(ها):</span>
                                <span>{formatPrice(subtotal)} تومان</span>
                            </div>

                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-300">سود شما از تخفیف‌ها:</span>
                                <div className="flex items-center gap-2">
                                    <span className="bg-[#C5A253] text-black text-xs font-bold px-2 py-1 rounded-full">
                                        {Math.round((totalDiscount / (subtotal + totalDiscount)) * 100)}٪
                                    </span>
                                    <span className="text-[#C5A253]">{formatPrice(totalDiscount)} تومان</span>
                                </div>
                            </div>

                            <div className="flex justify-between border-t border-gray-700 pt-2">
                                <span className="text-gray-300">هزینه ارسال:</span>
                                <span className="text-gray-200">{formatPrice(shippingCost)} تومان</span>
                            </div>

                            <div className="flex justify-between border-t border-gray-700 pt-3 font-semibold text-lg">
                                <span>مبلغ قابل پرداخت:</span>
                                <span>{formatPrice(totalPayable)} تومان</span>
                            </div>

                            {/* کد تخفیف */}
                            <div className="flex flex-col md:flex-row gap-2 mt-4">
                                <input
                                    type="text"
                                    placeholder="کد تخفیف"
                                    className="border border-gray-700 bg-white text-zinc-500 px-3 py-2 rounded-lg focus:outline-none focus:border-[#C5A253] w-full"
                                    value={discountCode}
                                    onChange={(e) => setDiscountCode(e.target.value)}
                                />
                                <button
                                    className="bg-[#7B2C3F] text-white px-5 py-2 rounded-lg font-semibold hover:bg-[#d4b061] transition w-full md:w-auto"
                                    onClick={handleApplyDiscount}
                                >
                                    اعمال
                                </button>
                            </div>

                            <button className="bg-[#BC264A] flex justify-center items-center gap-3 px-5 py-3 rounded-lg font-semibold hover:bg-[#ff3359] transition mt-4 w-full">
                                <FaCreditCard className="text-white" />
                                پرداخت آنلاین
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full flex flex-col justify-center items-center gap-3 p-4 md:p-6 bg-white shadow rounded-lg">
                    <BsCartX className="text-[100px] text-gray-300" />
                    <h3 className="text-xl font-bold text-blue-900">سبد خرید شما در حال حاضر خالی است.</h3>
                    <h3 className="text-md font-medium text-gray-500">لطفا ابتدا محصولاتی به سبد خرید خود اضافه کنید</h3>
                    <Link to="/products" className="bg-[#FF4D6D] text-white p-3 rounded-lg">بازگشت به فروشگاه</Link>
                </div>
            )}
        </div>
    );
};

export default Cart;
