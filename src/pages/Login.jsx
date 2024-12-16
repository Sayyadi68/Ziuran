import React, { useState, useRef } from 'react';

function AuthPage() {
    const inputsRef = useRef([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [otp, setOtp] = useState(Array(6).fill(''));
    const [isOtpSent, setIsOtpSent] = useState(false);

    const handleInputChange = (e, index) => {
        const value = e.target.value;
        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);

        if (value.length === 1 && index < 5) {
            inputsRef.current[index + 1]?.focus();
        } else if (value.length === 0 && index > 0) {
            inputsRef.current[index - 1]?.focus();
        }
    };

    const handlePhoneNumberSubmit = (e) => {
        e.preventDefault();
        const phoneRegex = /^09\d{9}$/;
        if (!phoneRegex.test(phoneNumber)) {
            alert('لطفاً شماره موبایل معتبر وارد کنید');
            return;
        }
        // Simulate sending OTP
        setIsOtpSent(true);
        alert('کد تایید ارسال شد!');
    };

    const handleOtpSubmit = async (e) => {
        e.preventDefault();
        const otpCode = otp.join('');

        // Validate OTP code
        if (otpCode.length !== 6) {
            alert('لطفاً کد تایید را به درستی وارد کنید');
            return;
        }

        try {
            // ارسال کد به بک‌اند
            const response = await fetch('/api/verify-otp', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ phoneNumber, otp: otpCode }),
            });

            const data = await response.json();

            if (response.ok) {
                alert('ورود موفقیت‌آمیز!');
                // Redirect to a new page or take further actions
            } else {
                alert(data.message || 'خطا در تایید کد');
            }
        } catch (error) {
            alert('مشکلی پیش آمده، لطفاً دوباره تلاش کنید');
        }
    };

    return (
        <div className="flex flex-col md:flex-row">

            {/* Login Section */}
            <div className="flex flex-col justify-center items-center md:w-1/2 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">ورود</h1>
                {!isOtpSent ? (
                    <form className="w-full max-w-sm" onSubmit={handlePhoneNumberSubmit}>
                        <div className="mb-4">
                            <label htmlFor="phone" className="block text-gray-700 mb-2">
                                شماره موبایل <span className="text-[#FF4D6D]">*</span>
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                className="w-full text-center border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                                placeholder="09123456789"
                                value={phoneNumber}
                                onChange={(e) => setPhoneNumber(e.target.value)}
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FF4D6D] hover:bg-[#FF4D6D] text-white font-semibold py-2 px-6 rounded-lg shadow-md w-full"
                        >
                            ارسال کد
                        </button>
                    </form>
                ) : (
                    <form className="w-full max-w-sm" onSubmit={handleOtpSubmit}>
                        <div className="mb-4">
                            <label htmlFor="otp" className="block text-gray-700 mb-2">
                                کد یکبار مصرف <span className="text-[#FF4D6D]">*</span>
                            </label>
                            <div className="flex justify-between">
                                {[...Array(6)].map((_, index) => (
                                    <input
                                        key={index}
                                        type="text"
                                        maxLength="1"
                                        className="w-12 h-12 border border-gray-300 rounded-lg text-center text-lg focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                                        ref={(el) => (inputsRef.current[index] = el)}
                                        value={otp[index]}
                                        onChange={(e) => handleInputChange(e, index)}
                                    />
                                ))}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="bg-[#FF4D6D] hover:bg-[#FF4D6D] text-white font-semibold py-2 px-6 rounded-lg shadow-md w-full"
                        >
                            ورود
                        </button>
                        <p className="mt-4 text-gray-600 text-center">
                            کد دریافت نکردید؟ <a href="#" className="text-[#FF4D6D] hover:underline">ارسال مجدد کد</a>
                        </p>
                    </form>
                )}
            </div>
            {/* Registration Section */}
            <div className="flex flex-col justify-center items-center bg-gray-100 md:w-1/2 p-6">
                <h1 className="text-2xl font-bold text-gray-800 mb-4">ثبت نام</h1>
                <p className="text-center text-gray-600 mb-8">
                    ثبت نام در این سایت به شما امکان می دهد به وضعیت و سابقه سفارش خود دسترسی داشته باشید. کافی است فیلدهای زیر را پر کنید و ما در کمترین زمان یک حساب کاربری جدید برای شما راه اندازی خواهیم کرد. ما فقط از شما اطلاعات لازم را برای سریع‌تر و آسان‌تر کردن فرآیند خرید می‌خواهیم.
                </p>
            </div>

        </div>
    );
}

export default AuthPage;
