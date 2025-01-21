import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaMapMarkerAlt, FaTachometerAlt, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaEye, FaEyeSlash } from "react-icons/fa";


const Dashboard = () => {

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        displayName: "mahid",
        email: "",
    });

    const [favorites, setFavorites] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // اعتبارسنجی داده‌ها
        if (formData.newPassword !== formData.confirmPassword) {
            alert("گذرواژه‌های جدید مطابقت ندارند!");
            return;
        }

        // ارسال داده‌ها به API
        console.log("ارسال به API:", formData);
        // شما می‌توانید درخواست به API را اینجا اضافه کنید (مثلاً با fetch یا axios)
    };


    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);



    const location = useLocation();
    const isActive = (path) => location.pathname === path;

    return (
        <div className=" bg-gray-100 flex flex-col lg:flex-row">
            <aside className="bg-white w-full lg:w-1/6 p-6 border-r">
                <h2 className="text-xl font-bold mb-6 font-[Byekan]">حساب کاربری من</h2>
                <nav>
                    <ul className="space-y-4 flex flex-col">
                        <Link
                            to="/account/dashboard"
                            className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse ${isActive("/account/dashboard") ? "text-[#FF4D6D]" : "text-gray-700"
                                }`}
                        >
                            <FaTachometerAlt />
                            <span>پیشخوان</span>
                        </Link>
                        <Link
                            to="/account/orders"
                            className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse ${isActive("/account/orders") ? "text-[#FF4D6D]" : "text-gray-700"
                                }`}
                        >
                            <FaShoppingCart />
                            <span>سفارش‌ها</span>
                        </Link>
                        <Link
                            to="/account/userdetail"
                            className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse ${isActive("/account/userdetail") ? "text-[#FF4D6D]" : "text-gray-700"
                                }`}
                        >
                            <FaUser />
                            <span>اطلاعات حساب</span>
                        </Link>
                        <Link
                            to="/account/favorites"
                            className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse ${isActive("/account/favorites") ? "text-[#FF4D6D]" : "text-gray-700"
                                }`}
                        >
                            <FaHeart />
                            <span>علاقه‌مندی</span>
                        </Link>
                        <Link
                            to="/account/logout"
                            className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse ${isActive("/account/logout") ? "text-[#FF4D6D]" : "text-gray-700"
                                }`}
                        >
                            <FaSignOutAlt />
                            <span>خروج</span>
                        </Link>
                    </ul>
                </nav>
            </aside>

            <main className="flex-1 p-6">
                <div className="bg-white shadow-md p-6 rounded-md">
                    <h3 className="text-lg font-bold mb-4 font-[Byekan]">
                        سلام mahid (نیستید؟ <span className="text-pink-600 cursor-pointer">خارج شوید</span>)
                    </h3>
                    <p className="text-gray-600 mb-6 font-[Byekan]">
                        از طریق حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را مشاهده، آدرس‌های حمل و نقل و صورت‌حساب‌تان را مدیریت، و جزئیات حساب کاربری و کلمه عبور خود را ویرایش کنید.
                    </p>
                    {isActive("/account/dashboard") ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Account Details */}
                            <Link
                                to="/account/userdetail"
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                            >
                                <FaUser className="text-2xl text-gray-700 mb-2" />
                                <span className="text-gray-700 text-center font-[Byekan]">جزئیات حساب</span>
                            </Link>

                            {/* Orders */}
                            <Link
                                to="/account/orders"
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                            >
                                <FaShoppingCart className="text-2xl text-gray-700 mb-2" />
                                <span className="text-gray-700 text-center font-[Byekan]">سفارش‌ها</span>
                            </Link>

                            {/* Favorites */}
                            <Link
                                to="/account/favorites"
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                            >
                                <FaHeart className="text-2xl text-gray-700 mb-2" />
                                <span className="text-gray-700 text-center font-[Byekan]">علاقه‌مندی</span>
                            </Link>

                            {/* Logout */}
                            <Link
                                to="/account/logout"
                                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
                            >
                                <FaSignOutAlt className="text-2xl text-gray-700 mb-2" />
                                <span className="text-gray-700 text-center font-[Byekan]">خروج</span>
                            </Link>
                        </div>
                    ) : null}

                    {isActive("/account/userdetail") ? (
                        <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md">
                            <form onSubmit={handleSubmit}>
                                {/* نام و نام خانوادگی */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 font-[Byekan]">
                                            نام <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="firstName"
                                            value={formData.firstName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-3 py-2"
                                            placeholder="نام خود را وارد کنید"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 font-[Byekan]">
                                            نام خانوادگی <span className="text-red-500">*</span>
                                        </label>
                                        <input
                                            type="text"
                                            name="lastName"
                                            value={formData.lastName}
                                            onChange={handleChange}
                                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-3 py-2"
                                            placeholder="نام خانوادگی خود را وارد کنید"
                                        />
                                    </div>
                                </div>

                                {/* نام نمایشی و ایمیل */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 font-[Byekan]">نام نمایشی</label>
                                    <input
                                        type="text"
                                        name="displayName"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 text-gray-500 shadow-sm sm:text-sm px-3 py-2"
                                    />
                                    <p className="text-sm text-gray-500 mt-1 font-[Byekan]">
                                        اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                                    </p>
                                </div>
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 font-[Byekan]">
                                        آدرس ایمیل <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-pink-500 focus:border-pink-500 sm:text-sm px-3 py-2"
                                        placeholder="example@email.com"
                                    />
                                </div>
                                <div className="mt-6">
                                    <button
                                        type="submit"
                                        className="w-full py-2 px-4 bg-pink-500 text-white font-semibold rounded-md shadow hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:ring-offset-2 font-[Byekan]"
                                    >
                                        ذخیره تغییرات
                                    </button>
                                </div>
                            </form>
                        </div>
                    ) : null}

                    {isActive("/account/favorites") && favorites.length == 0 ? (
                        <div className="w-full flex flex-col justify-center items-center gap-3 h-full p-4 md:p-6">
                            <FaHeart className="text-[100px] text-gray-300" />
                            <h3 className="text-xl font-bold text-blue-900">
                                علاقه‌مندی‌های شما در حال حاضر خالی است.
                            </h3>
                            <p className="text-md font-medium text-gray-500 text-center">
                                علاقه‌مندی‌های شما خالی است. لطفاً ابتدا از فروشگاه محصولاتی را به علاقه‌مندی‌های خود اضافه کنید.
                            </p>
                            <Link
                                to="/products"
                                className="bg-[#FF4D6D] text-white py-2 px-4 rounded-lg shadow hover:bg-[#ff3355] transition"
                            >
                                رفتن به فروشگاه
                            </Link>
                        </div>
                    ) : null}




                </div>
            </main>

        </div>
    );
};

export default Dashboard;
