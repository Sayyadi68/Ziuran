import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { BsCartX } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { fetchCart, addItemToCart, updateItemQuantity, removeItemFromCart, applyDiscount, initiatePayment } from "../redux/cartSlice";
import UserLocations from '../components/UserAddress';
import { FaPlus, FaMinus, FaTrash, FaCreditCard } from "react-icons/fa";

const Cart = ({ product }) => {
    const dispatch = useDispatch();
    const { items = [], cartUuid, total_price = 0, discount, status, error } = useSelector((state) => state.cart);
    const [discountCode, setDiscountCode] = useState(discount?.code || "");
    const [quantity, setQuantity] = useState(1);
    const [showCart, setShowCart] = useState(false);
    const [shouldRefresh, setShouldRefresh] = useState(false);

    // لود اولیه سبد خرید
    useEffect(() => {
        console.log("Fetching cart on mount...");
        dispatch(fetchCart()).then((result) => {
            console.log("Fetch cart result:", result);
        });
    }, [dispatch]);

    // رفرش سبد خرید بعد از آپدیت تعداد یا اضافه کردن آیتم
    useEffect(() => {
        if (shouldRefresh && status === 'succeeded' && cartUuid) {
            console.log("Refreshing cart after update...");
            dispatch(fetchCart()).then((result) => {
                console.log("Refresh cart result:", result);
                setShouldRefresh(false); // ریست فلگ برای جلوگیری از لوپ
            });
        }
    }, [shouldRefresh, status, cartUuid, dispatch]);

    const handleAddToCart = () => {
        if (!product) {
            console.error("No product provided to add to cart");
            return;
        }
        console.log("Adding to cart:", { productId: product.id, quantity });
        dispatch(addItemToCart({ productId: product.id, quantity }))
            .then((result) => {
                console.log("Add to cart result:", result);
                if (addItemToCart.fulfilled.match(result)) {
                    setShowCart(true);
                    setShouldRefresh(true); // فعال کردن رفرش
                }
            });
    };

    const handleQuantityChange = (itemId, type) => {
        if (!cartUuid) {
            console.error("No cartUuid found");
            alert("سبد خرید یافت نشد.");
            return;
        }
        const quantityChange = type === "increment" ? 1 : -1;
        const item = items.find((item) => item.id === itemId);
        if (!item) {
            console.error("Item not found:", itemId);
            return;
        }
        const newQuantity = item.quantity + quantityChange;
        console.log("Updating quantity:", { itemId, cartUuid, newQuantity });
        if (newQuantity >= 1) {
            dispatch(updateItemQuantity({ itemId, cartUuid, quantity: newQuantity }))
                .then((result) => {
                    console.log("Update quantity result:", result);
                    if (updateItemQuantity.fulfilled.match(result)) {
                        setShouldRefresh(true); // فعال کردن رفرش
                    }
                });
        } else {
            dispatch(removeItemFromCart({ itemId, cartUuid }))
                .then((result) => {
                    console.log("Remove item result:", result);
                    if (removeItemFromCart.fulfilled.match(result)) {
                        setShouldRefresh(true); // فعال کردن رفرش
                    }
                });
        }
    };

    const handleRemoveFromCart = (itemId) => {
        if (!cartUuid) {
            console.error("No cartUuid found");
            alert("سبد خرید یافت نشد.");
            return;
        }
        console.log("Removing item:", { itemId, cartUuid });
        dispatch(removeItemFromCart({ itemId, cartUuid }))
            .then((result) => {
                console.log("Remove item result:", result);
                if (removeItemFromCart.fulfilled.match(result)) {
                    setShouldRefresh(true); // فعال کردن رفرش
                }
            });
    };

    const handleApplyDiscount = () => {
        if (discountCode) {
            console.log("Applying discount:", discountCode);
            dispatch(applyDiscount(discountCode));
        } else {
            alert("لطفاً کد تخفیف را وارد کنید");
        }
    };

    const handlePayment = () => {
        if (!cartUuid) {
            console.error("No cartUuid found for payment");
            alert("سبد خرید یافت نشد.");
            return;
        }
        console.log("Initiating payment for cartUuid:", cartUuid);
        dispatch(initiatePayment({ cartUuid }));
    };

    const parsePrice = (price) =>
        Number(price.toString().replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d)).replace(/[^\d]/g, ""));
    const formatPrice = (num) => num.toLocaleString("fa-IR").replace(/٬/g, ",");

    const subtotal = parsePrice(total_price);
    const totalDiscount = discount ? parsePrice(discount.amount || 0) : 0;
    const shippingCost = 25000;
    const totalPayable = subtotal - totalDiscount + shippingCost;

    console.log("Cart state:", { items, cartUuid, total_price, discount, status, error });

    if (!showCart && product) {
        return (
            <div className="p-4 bg-white rounded-lg shadow max-w-2xl mx-auto">
                <h2 className="text-xl font-bold text-blue-900">{product.name}</h2>
                <img src={product.image} alt={product.name} className="w-32 h-32 rounded my-2 mx-auto" />
                <p className="text-gray-700 text-lg">قیمت: {formatPrice(parsePrice(product.price))} تومان</p>
                <div className="flex items-center gap-2 my-4 justify-center">
                    <label className="text-gray-700 font-medium">تعداد:</label>
                    <input
                        type="number"
                        min="1"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        className="border p-2 w-20 rounded text-center"
                    />
                </div>
                <button
                    onClick={handleAddToCart}
                    disabled={status === 'loading'}
                    className="w-full bg-[#BC264A] text-white px-6 py-3 rounded-lg font-semibold hover:bg-[#ff3359] transition text-lg"
                >
                    {status === 'loading' ? 'در حال افزودن...' : 'افزودن به سبد خرید و مشاهده'}
                </button>
                {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
            </div>
        );
    }

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-6 w-full p-4 md:p-8 md:max-w-[1490px] mx-auto">
            { items.length > 0 ? (
                <>
                    <div className="w-full lg:w-2/3 flex flex-col gap-6">
                        <UserLocations />
                        <div className="bg-[#272727] rounded-xl p-6 md:p-8">
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-lg font-bold text-white font-[Byekan]">سبد محصولات</h2>
                                {product && (
                                    <button
                                        onClick={() => setShowCart(false)}
                                        className="text-[#C5A253] hover:text-white transition"
                                    >
                                        ← ادامه خرید
                                    </button>
                                )}
                            </div>
                            <div className="md:hidden flex flex-col gap-4">
                                {items.map((item) => (
                                    <div key={item.id} className="flex flex-col gap-2 border-b pb-4">
                                        <div className="flex items-center gap-4">
                                            <img src={item.product.image} alt={item.product.name} className="w-14 h-14 rounded" />
                                            <span className="truncate text-[#C5A253]">{item.product.name}</span>
                                        </div>
                                        <div className="flex justify-between text-white">
                                            <span>قیمت:</span>
                                            <span>{formatPrice(parsePrice(item.product.price))} تومان</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span className="text-white">تعداد:</span>
                                            <div className="flex items-center gap-3">
                                                <button
                                                    className="text-[#C5A253]"
                                                    onClick={() => handleQuantityChange(item.id, "increment")}
                                                    disabled={status === 'loading'}
                                                >
                                                    <FaPlus />
                                                </button>
                                                <span className="text-xl text-[#C5A253]">{item.quantity}</span>
                                                <button
                                                    className="text-[#C5A253]"
                                                    onClick={() =>
                                                        item.quantity === 1
                                                            ? handleRemoveFromCart(item.id)
                                                            : handleQuantityChange(item.id, "decrement")
                                                    }
                                                    disabled={status === 'loading'}
                                                >
                                                    {item.quantity === 1 ? <FaTrash /> : <FaMinus />}
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="hidden md:block overflow-x-auto">
                                <table className="w-full text-right border-collapse">
                                    <thead>
                                        <tr className="bg-[#353535] text-white border-b">
                                            <th className="py-2 px-4">محصول</th>
                                            <th className="py-2 px-4">قیمت</th>
                                            <th className="py-2 px-4">تعداد</th>
                                            <th className="py-2 px-4">قیمت کل</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {items.map((item) => (
                                            <tr key={item.id} className="border-b">
                                                <td className="py-3 px-4 flex items-center gap-2">
                                                    <img src={item.product.image} alt={item.product.name} className="w-12 h-12 rounded" />
                                                    <span className="truncate text-[#C5A253]">{item.product.name}</span>
                                                </td>
                                                <td className="py-3 px-4 text-white">{formatPrice(parsePrice(item.product.price))} تومان</td>
                                                <td className="py-3 px-4">
                                                    <div className="flex items-center justify-center gap-2">
                                                        <button
                                                            onClick={() => handleQuantityChange(item.id, "increment")}
                                                            className="text-[#C5A253]"
                                                            disabled={status === 'loading'}
                                                        >
                                                            <FaPlus />
                                                        </button>
                                                        <span className="text-[#C5A253]">{item.quantity}</span>
                                                        <button
                                                            onClick={() =>
                                                                item.quantity === 1
                                                                    ? handleRemoveFromCart(item.id)
                                                                    : handleQuantityChange(item.id, "decrement")
                                                            }
                                                            className="text-[#C5A253]"
                                                            disabled={status === 'loading'}
                                                        >
                                                            {item.quantity === 1 ? <FaTrash /> : <FaMinus />}
                                                        </button>
                                                    </div>
                                                </td>
                                                <td className="py-3 px-4 text-white">
                                                    {formatPrice(parsePrice(item.product.price) * item.quantity)} تومان
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-1/3 bg-[#272727] rounded-2xl p-5 text-white flex-shrink-0 h-full">
                        <div className="flex flex-col gap-4 font-medium">
                            <p className="text-xl font-semibold text-[#C5A253] mb-2">جمع کل</p>
                            <div className="flex justify-between text-sm md:text-base">
                                <span className="text-gray-300">جمع کل سبد:</span>
                                <span>{formatPrice(subtotal)} تومان</span>
                            </div>
                            <div className="flex justify-between items-center text-sm md:text-base">
                                <span className="text-gray-300">تخفیف:</span>
                                <div className="flex items-center gap-2">
                                    {totalDiscount > 0 && (
                                        <span className="bg-[#C5A253] text-black text-xs font-bold px-2 py-1 rounded-full">
                                            {Math.round((totalDiscount / subtotal) * 100)}٪
                                        </span>
                                    )}
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
                                    disabled={status === 'loading'}
                                >
                                    اعمال
                                </button>
                            </div>
                            <button
                                className="bg-[#BC264A] flex justify-center items-center gap-3 px-5 py-3 rounded-lg font-semibold hover:bg-[#ff3359] transition mt-4 w-full"
                                onClick={handlePayment}
                                disabled={status === 'loading' || !cartUuid}
                            >
                                <FaCreditCard className="text-white" />
                                پرداخت آنلاین
                            </button>
                        </div>
                    </div>
                </>
            ) : (
                <div className="w-full flex flex-col justify-center items-center gap-3 p-4 md:p-6 bg-white shadow rounded-lg">
                    <BsCartX className="text-[100px] text-gray-300" />
                    <h3 className="text-xl font-bold text-blue-900">سبد خرید خالی است</h3>
                    {product ? (
                        <button
                            onClick={() => setShowCart(false)}
                            className="bg-[#FF4D6D] text-white p-3 rounded-lg"
                        >
                            ادامه خرید
                        </button>
                    ) : (
                        <Link to="/" className="bg-[#FF4D6D] text-white p-3 rounded-lg">
                            بازگشت به فروشگاه
                        </Link>
                    )}
                </div>
            )}
        </div>
    );
};

export default Cart;