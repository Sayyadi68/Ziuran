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
    setIsOtpSent(true);
    alert('کد تایید ارسال شد!');
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    const otpCode = otp.join('');

    if (otpCode.length !== 6) {
      alert('لطفاً کد تایید را به درستی وارد کنید');
      return;
    }

    try {
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ phoneNumber, otp: otpCode }),
      });

      const data = await response.json();

      if (response.ok) {
        alert('ورود موفقیت‌آمیز!');
      } else {
        alert(data.message || 'خطا در تایید کد');
      }
    } catch (error) {
      alert('مشکلی پیش آمده، لطفاً دوباره تلاش کنید');
    }
  };

  return (
    <div className="flex flex-col md:flex-row bg-[#2D2D2D] min-h-screen p-6">
      <div className="flex flex-col justify-center items-center md:w-1/2">
        <h1 className="text-2xl font-bold text-white mb-6">ورود</h1>
        {!isOtpSent ? (
          <form className="w-full max-w-sm" onSubmit={handlePhoneNumberSubmit}>
            <div className="mb-4">
              <label htmlFor="phone" className="block text-white mb-2">
                شماره موبایل <span className="text-[#FF4D6D]">*</span>
              </label>
              <input
                type="tel"
                id="phone"
                className="w-full text-center bg-[#3A3A3A] border-2 border-[#4A4A4A] rounded-lg px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-[#FF4D6D]"
                placeholder="09123456789"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-[#FF4D6D] text-white font-semibold py-2 rounded-lg shadow-md hover:bg-[#e63965]"
            >
              ارسال کد
            </button>
          </form>
        ) : (
          <form className="w-full max-w-sm" onSubmit={handleOtpSubmit}>
            <div className="mb-6">
              <label htmlFor="otp" className="block text-sm text-gray-300 mb-2 font-[IranSans] font-medium">
                کد یکبار مصرف *
              </label>
              <div className="flex flex-row-reverse justify-center space-x-2 mb-5">
                {[...Array(6)].map((_, index) => (
                  <input
                    key={index}
                    type="text"
                    maxLength="1"
                    className="w-11 h-11 bg-[#2A2A2A] border-2 border-[#505050] rounded-lg text-center text-lg text-white focus:outline-none focus:ring-2 focus:ring-[#FFD700] shadow-sm "
                    ref={(el) => (inputsRef.current[index] = el)}
                    value={otp[index]}
                    onChange={(e) => handleInputChange(e, index)}
                  />
                ))}
              </div>
              <p className="text-xs text-gray-500 text-center mb-4 font-[IranSans]">
                کد دریافت نکردید؟{' '}
                <a href="#" className="text-[#FFD700] hover:underline font-medium">
                  ارسال مجدد کد
                </a>
              </p>
              <button
                type="submit"
                className="w-full bg-[#FFD700] text-black font-bold py-2.5 rounded-lg hover:bg-[#FFC107] transition-colors duration-200 shadow-md"
              >
                ورود
              </button>
            </div>
          </form>
        )}
      </div>
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