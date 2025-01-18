import React, { useState } from "react";

const Cart = () => {
    const [quantity, setQuantity] = useState(4);
    const [discountCode, setDiscountCode] = useState("");

    const products = [
        {
            id: 1,
            name: "ادو پرفیوم زنانه روونا گود گرل",
            price: "۳۳۷,۰۰۰ تومان",
            total: "۹۴۸,۰۰۰ تومان",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 2,
            name: "ادو پرفیوم زنانه روونا گود گرل ۲",
            price: "۳۵۰,۰۰۰ تومان",
            total: "۱,۰۵۰,۰۰۰ تومان",
            image: "https://via.placeholder.com/50",
        },
        {
            id: 3,
            name: "ادو پرفیوم زنانه روونا گود گرل ۲",
            price: "۳۵۰,۰۰۰ تومان",
            total: "۱,۰۵۰,۰۰۰ تومان",
            image: "https://via.placeholder.com/50",
        },
    ];

    const handleQuantityChange = (type) => {
        if (type === "increment") {
            setQuantity(quantity + 1);
        } else if (type === "decrement" && quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    const handleApplyDiscount = () => {
        alert(`کد تخفیف وارد شده: ${discountCode}`);
    };

    return (
        <div className="flex flex-col lg:flex-row justify-center gap-10 w-full p-4 md:p-8 ">
            <div className="w-full h-full lg:w-[60%] p-4 md:p-6 shadow ">
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
                                        <span>{product.price}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span>تعداد:</span>
                                        <div className="flex items-center gap-2">
                                            <button
                                                className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                                onClick={() => handleQuantityChange("decrement")}
                                            >
                                                -
                                            </button>
                                            <span className="px-3 text-center border rounded bg-white">
                                                {quantity}
                                            </span>
                                            <button
                                                className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                                onClick={() => handleQuantityChange("increment")}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>جمع جز:</span>
                                        <span>{product.total}</span>
                                    </div>
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
                                <th className="py-2 px-4">جمع جز</th>
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
                                    <td className="py-3 px-4">{product.price}</td>
                                    <td className="py-3 px-4 flex items-center justify-center gap-2">
                                        <button
                                            className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                            onClick={() => handleQuantityChange("decrement")}
                                        >
                                            -
                                        </button>
                                        <span className="px-3 text-center border rounded bg-white">
                                            {quantity}
                                        </span>
                                        <button
                                            className="px-2 py-1 border rounded bg-gray-100 hover:bg-gray-200"
                                            onClick={() => handleQuantityChange("increment")}
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="py-3 px-4">{product.total}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center mt-6 gap-4">
                    <div className="flex items-center w-full md:w-1/2">
                        <input
                            type="text"
                            placeholder="کد تخفیف"
                            className="w-full border rounded px-3 py-2 text-right focus:outline-none focus:ring focus:ring-pink-200"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                        />
                        <button
                            className="bg-pink-500 text-white px-4 py-2 rounded ml-2 hover:bg-pink-600"
                            onClick={handleApplyDiscount}
                        >
                            اعمال کد تخفیف
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full h-full lg:w-[25%] mt-4 lg:mt-0 bg-white shadow rounded-lg p-4 md:p-6">
                <div className="font-medium">
                    <p>جمع کل سبد خرید:</p>
                    <div className="flex justify-between items-center py-3 font-medium">
                        <p>جمع جزء :</p>
                        <span className="font-medium">۹۴۸,۰۰۰ تومان</span>
                    </div>
                    <div className="flex justify-between items-center py-3 font-medium border-t">
                        <p>مجموع :</p>
                        <span className="text-pink-500 font-medium">۹۴۸,۰۰۰ تومان</span>
                    </div>
                </div>
                <button className="bg-pink-500 text-white mt-4 px-6 py-3 rounded w-full hover:bg-pink-600">
                    ادامه جهت تسویه حساب
                </button>
            </div>
        </div>
    );
};

export default Cart;
