import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaCreditCard, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import UserLocations from '../components/UserAddress';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { fetchUser, logout, updateUser } from "../redux/userSlice";
import axios from 'axios'
import jalaali from 'jalaali-js';
import { toast } from "react-toastify";
 

import DatePicker, { DateObject } from "react-multi-date-picker";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import gregorian from "react-date-object/calendars/gregorian";


// Utility functions
const formatNumber = (num) =>
  num != null ? num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : "0";
const formatJalaliVerbose = (jalaliString) => {
  // فرض می‌کنیم ورودی مثل "1404/08/05 12:45"
  const [datePart] = jalaliString.split(' ');
  const [jy, jm, jd] = datePart.split('/').map(Number);

  const { gy, gm, gd } = jalaali.toGregorian(jy, jm, jd);
  const date = new Date(gy, gm - 1, gd); // ساخت تاریخ میلادی برای محاسبه روز هفته

  const weekdays = ["یک‌شنبه", "دوشنبه", "سه‌شنبه", "چهارشنبه", "پنج‌شنبه", "جمعه", "شنبه"];
  const months = ["فروردین", "اردیبهشت", "خرداد", "تیر", "مرداد", "شهریور", "مهر", "آبان", "آذر", "دی", "بهمن", "اسفند"];

  const dayOfWeek = weekdays[date.getDay()];
  const day = jd;
  const month = months[jm - 1];

  return `${dayOfWeek} ${day} ${month}`;
};
const OrderItem = ({ item, index }) => (
  <tr className="border-b border-gray-200">
    <td className="p-3 text-center text-white font-[Byekan]">{index + 1}.</td>
    <td className="p-3 text-white font-[Byekan]">
      <div>{item.product_name}</div>
      {item.product_weight && (
        <div className="text-sm text-gray-500">{item.product_weight}</div>
      )}
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">
      {formatNumber(item.quantity)} عدد
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">
      {formatNumber(item.original_unit_price)} تومان
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">
      {item.discount_percentage ? (
        <span className="text-orange-500">
          {item.discount_percentage}%{" "}
          {formatNumber(item.original_unit_price - item.unit_price)} تومان
        </span>
      ) : (
        "-"
      )}
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">
      {formatNumber(item.total_price)} تومان
    </td>
  </tr>
);


const statusMap = {
  pending: { label: "در انتظار جمع‌آوری", color: "#16A34A", progress: 1 },
  packed: { label: "بسته‌بندی شده", color: "#16A34A", progress: 2 },
  shipped: { label: "ارسال شده", color: "#16A34A", progress: 3 },
  delivered: { label: "تحویل شد", color: "#16A34A", progress: 4 },
  cancelled: { label: "لغو شده", color: "#EF4444", progress: 4 },
  returned: { label: "مرجوع شده", color: "#F59E0B", progress: 4 },
};

const getStageColor = (status) => {
  return statusMap[status]?.color || "#A3A3A3";
};

const getProgressFromStatus = (status) => {
  return statusMap[status]?.progress || 1;
};

const getDeliveryLabel = (status) => {
  return statusMap[status]?.label || status;
};

const ProgressBar = ({ order }) => {
  const statusKeys = ["pending", "packed", "shipped", "delivered"];
  const stages = statusKeys.map((key) => statusMap[key].label);

  if (!order || !order.delivery_status)
    return <div className="text-red-500 font-[Byekan] text-sm">خطا: اطلاعات سفارش معتبر نیست.</div>;

  const progress = getProgressFromStatus(order.delivery_status);
  const color = getStageColor(order.delivery_status);
  const isCanceled =
    order.status === "failed" || order.delivery_status === "returned" || order.delivery_status === "cancelled";

  const stageStyles = useMemo(() => {
    return stages.map((_, index) => {
      const isCompleted = index < progress - 1;
      const isCurrent = index === progress - 1;
      let bgColor = "white";
      let borderColor = "#D1D5DB";
      let icon = null;

      if (isCanceled) {
        bgColor = getStageColor(order.delivery_status);
        borderColor = getStageColor(order.delivery_status);
        icon = <span className="text-white font-bold">X</span>;
      } else if (isCompleted) {
        bgColor = color;
        borderColor = color;
        icon = <span className="text-white">✓</span>;
      } else if (isCurrent) {
        bgColor = color;
        borderColor = color;
        icon = <span className="w-2 h-2 bg-white rounded-full"></span>;
      }

      return { bgColor, borderColor, icon, isCompleted, isCurrent };
    });
  }, [progress, color, isCanceled, order.delivery_status]);

  return (
    <div className="flex items-center justify-between mb-8 w-full mr-[8%] md:w-[80%] md:mr-[20%] flex-row" role="progressbar">
      {stages.map((stage, index) => {
        const { bgColor, borderColor, icon, isCompleted, isCurrent } = stageStyles[index];
        return (
          <div key={stage} className="flex items-center w-full relative">
            <div className="relative flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={{ backgroundColor: bgColor, borderColor }}
                aria-hidden="true"
              >
                {icon}
              </div>
              <div className="absolute top-10 text-sm text-gray-300 font-[Byekan] text-center whitespace-nowrap">
                {stage}
              </div>
            </div>
            {index < stages.length - 1 && (
              <div className="flex-1 h-1 mx-2 relative" dir="rtl">
                <div className="absolute top-0 right-0 w-full h-full bg-gray-600 rounded-full"></div>
                <div
                  className="absolute top-0 right-0 h-full rounded-full transition-all duration-500"
                  dir="rtl"
                  style={{
                    backgroundColor: isCanceled ? getStageColor(order.delivery_status) : color,
                    width: isCanceled ? "100%" : isCompleted ? "100%" : isCurrent ? "50%" : "0%",
                  }}
                ></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};


const Order = ({ order }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState("");
  const [selectedItems, setSelectedItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  const handleCancelSubmit = () => setSuccessMessage("درخواست شما با موفقیت ثبت شد.");
  const handleReturnSubmit = () => setSuccessMessage("درخواست شما با موفقیت ثبت شد.");

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white font-[Byekan]">
      <div className="flex md:flex-row flex-col justify-between items-start gap-3 md:items-center mb-4">
        <h3 className="text-lg text-[#C5A253] font-bold">{formatJalaliVerbose(order.created_at_jalali)}</h3>
        <div className="text-md text-gray-200 flex flex-col sm:flex-row-reverse gap-4 ">
          <span>{order.created_at_jalali}</span>
          <span className="hidden sm:block">|</span>
          <span>{order.reference_id || "-"}</span>
          <span className="hidden sm:block">|</span>
          <span className="flex flex-row gap-3 items-center">
            <FaCreditCard className="text-white" /> {order.payment_type || "-"}
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-bold">وضعیت: </span>
        <span style={{ color: getStageColor(order.delivery_status) }}>
          {getDeliveryLabel(order.delivery_status)}
        </span>
      </div>

      <ProgressBar order={order} />

      {order.status === "delivered" && (
        <div className="text-sm mb-4 mt-4">
          <div>آدرس: {order.address}</div>
          <div>گیرنده: {order.receiver}</div>
          <div>زمان تحویل: {order.delivery_time}</div>
        </div>
      )}

      {(order.status === "returned" || order.status === "canceled") && order.description && (
        <div className="text-sm mb-4 text-red-500">توضیحات: {order.description}</div>
      )}

      <div className="my-10">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr className="border-b border-gray-600">
              <th className="p-2 text-left text-white">نام محصول</th>
              <th className="p-2 text-left text-white">تعداد محصول</th>
              <th className="p-2 text-left text-white">قیمت اصلی کالا(ها)</th>
              <th className="p-2 text-left text-white">تخفیف کالا</th>
              <th className="p-2 text-left text-white">قیمت کل</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, index) => (
              <OrderItem key={item.id} item={item} index={index} />
            ))}
          </tbody>
        </table>
      </div>


      {/* Summary */}
      <div className="flex justify-between text-sm mb-4 border-t border-gray-600 pt-4">
        <div>هزینه ارسال <br /> {formatNumber(order.shipping_cost)}</div>
        <div>جمع سفارش <br /> {formatNumber(order.original_items_total)}</div>
        <div>جمع تخفیف <br /> {formatNumber(order.total_discount_amount)}</div>
        <div>قابل پرداخت <br /> {formatNumber(order.total_discount_percentage)}%</div>
        <div>مبلغ نهایی <br /> {formatNumber(order.amount_paid)}</div>
      </div>

      {/* Payment Info */}
      <div className="text-sm mb-4">
        <div className="font-bold mb-2">اطلاعات پرداخت</div>
        {order.user || order.card_number ? (
          <>
            <div>صاحب کارت: {order.user.user || "-"}</div>
            <div>کارت مبدا: {order.card_number || "-"}</div>
            <div>تاریخ و زمان: {order.created_at_jalali || "-"}</div>
            <div>شماره پیگیری: {order.tracking_code || "-"}</div>
            <div>شماره مرجع: {order.reference_id || "-"}</div>
            <div>شماره پیگیری اسنپ باکس: {order.snapbox_tracking_code || "-"}</div>
          </>
        ) : (
          <div className="text-gray-400">اطلاعات پرداخت موجود نیست</div>
        )}
      </div>


      {order.return_window && <div className="text-sm mb-4 text-gray-400">{order.return_window}</div>}

      <div className="flex justify-end gap-4">
        {order.status === "delivered" && (
          <button onClick={() => setIsReturnModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded">
            مرجوع کردن کالا
          </button>
        )}
        <button className="bg-green-500 text-white px-4 py-2 rounded">سفارش مجدد فاکتور</button>
        {order.status === "current" && (
          <button onClick={() => setIsCancelModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
            لغو سفارش
          </button>
        )}
      </div>

      {/* Cancel Modal */}
      <div
        className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${isCancelModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="bg-[#272727] text-gray-400 p-6 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-yellow-500 text-lg font-bold mb-4">دلیل لغو سفارش</h2>
          {successMessage ? (
            <div className="text-center">
              <div className="text-yellow-500 mb-4">{successMessage}</div>
              <button
                onClick={() => {
                  setIsCancelModalOpen(false);
                  setCancelReason("");
                  setSuccessMessage("");
                }}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                بستن
              </button>
            </div>
          ) : (
            <>
              <select
                value={cancelReason}
                onChange={(e) => setCancelReason(e.target.value)}
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-400 rounded mb-4"
              >
                <option value="">انتخاب کنید</option>
                <option value="دیر کرد در ارسال">دیر کرد در ارسال</option>
                <option value="نبودن در خانه">نبودن در خانه</option>
              </select>
              <textarea
                placeholder="دلیل"
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-400 rounded mb-4"
              ></textarea>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsCancelModalOpen(false);
                    setCancelReason("");
                    setSuccessMessage("");
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    if (cancelReason) handleCancelSubmit();
                  }}
                  className={`bg-red-800 text-white px-4 py-2 rounded ${cancelReason ? "hover:bg-red-700" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  تأیید
                </button>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Return Modal */}
      <div
        className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${isReturnModalOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
      >
        <div className="bg-[#272727] text-gray-400 p-6 rounded-lg max-w-md w-full mx-4">
          <h2 className="text-yellow-500 text-lg font-bold mb-4">دلیل مرجوع کردن سفارش</h2>
          {successMessage ? (
            <div className="text-center">
              <div className="text-yellow-500 mb-4">{successMessage}</div>
              <button
                onClick={() => {
                  setIsReturnModalOpen(false);
                  setSelectedItems([]);
                  setSuccessMessage("");
                }}
                className="bg-red-800 text-white px-4 py-2 rounded hover:bg-red-700"
              >
                بستن
              </button>
            </div>
          ) : (
            <>
              <div className="mb-4">
                <h4 className="text-yellow-500 font-bold">انتخاب کالای مرجوعی</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center py-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={selectedItems.includes(item.id)}
                        onChange={() => {
                          setSelectedItems((prev) =>
                            prev.includes(item.id) ? prev.filter((id) => id !== item.id) : [...prev, item.id]
                          );
                        }}
                        className="w-4 h-4 text-yellow-500 bg-gray-800 border-gray-600 rounded"
                      />
                      <span>{item.product_name} ({item.product_weight})</span>
                    </div>
                    <div>{formatNumber(item.total_price)} تومان</div>
                  </div>
                ))}
              </div>
              <textarea
                placeholder="دلیل"
                className="w-full p-2 border border-gray-600 bg-gray-800 text-gray-400 rounded mb-4"
              ></textarea>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => {
                    setIsReturnModalOpen(false);
                    setSelectedItems([]);
                    setSuccessMessage("");
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    if (selectedItems.length > 0) handleReturnSubmit();
                  }}
                  className={`bg-red-800 text-white px-4 py-2 rounded ${selectedItems.length > 0 ? "hover:bg-red-700" : "opacity-50 cursor-not-allowed"
                    }`}
                >
                  تأیید
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const BuyHistory = () => {
  const [activeTab, setActiveTab] = useState('current');
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    axios.get("http://127.0.0.1:8000/api/transactions/")
      .then((res) => {
        console.log("API Response:", res.data);
        if (Array.isArray(res.data)) setOrders(res.data);
        else if (res.data.results) setOrders(res.data.results);
      })
      .catch((err) => console.error(err));
  }, []);

  const filteredOrders = orders.filter((order) => {
    if (activeTab === 'all') return true;

    // فیلتر کردن بر اساس delivery_status
    switch (activeTab) {
      case 'current':
        return order.status === "success";
      case 'delivered':
        return order.delivery_status === "delivered" && order.status === "success";
      case 'returned':
        return order.delivery_status === "returned";
      case 'canceled':
        return order.status === "failed" && order.delivery_status != "delivered" && order.delivery_status != "returned";
      default:
        return true;
    }
  });

  return (
    <div className="max-w-5xl mx-auto bg-[#272727]  p-6 rounded-lg text-white font-[Byekan]">
      <h1 className="text-2xl font-bold mb-6">تاریخچه سفارشات</h1>

      <div className="flex gap-4 mb-6 ">
        {['current', 'delivered', 'returned', 'canceled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2  ${activeTab === tab ? 'text-[#C5A253] border-b-[3px] border-[#C5A253]' : ''}`}
          >
            {tab === 'current' ? 'جاری' : tab === 'delivered' ? 'تحویل داده شده' : tab === 'returned' ? 'مرجوع شده' : 'لغو شده'}
          </button>
        ))}
      </div>

      {
        filteredOrders.length > 0 ? (
          <div className="h-[600px] overflow-auto">
            {filteredOrders.map((order) => (
              <Order key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center text-white">هیچ سفارشی یافت نشد.</div>
        )
      }

    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const loading = useSelector((state) => state.user.loading);
  const fetchError = useSelector((state) => state.user.error);
  const updateLoading = useSelector((state) => state.user.updateLoading);
  const updateError = useSelector((state) => state.user.updateError);

  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    phone_number: '',
    birth_date: '',
  });

  useEffect(() => {
    const token = localStorage.getItem('grushell_access_token');
    console.log(token);

    if (!token && !userData) {
      // navigate('/login');
    } else if (!userData && !loading && !fetchError) {
      dispatch(fetchUser({ useSession: false })); // توکن برای userdetail
    }
  }, [dispatch, userData, loading, fetchError, navigate]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };


  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedFormData = {
      first_name: formData.first_name || "",
      last_name: formData.last_name || "",
      birth_date: formData.birth_date || null,
    };

    console.log("📤 ارسال به سرور:", formattedFormData);

    dispatch(updateUser(formattedFormData))
      .unwrap()
      .then(() => {

        toast.success("✅ تغییرات ثبت شد!");

        setTimeout(() => {
          window.location.reload();
        }, 2000);

      })
      .catch((err) => {
        alert("⚠️ خطا: " + (err.message || JSON.stringify(err)));
      });
  };


  const location = useLocation();
  const isActive = (path) => location.pathname === path;


  const [displayDate, setDisplayDate] = useState(""); // برای نمایش فقط رشته شمسی
  const [pickerValue, setPickerValue] = useState(null); // نگهداری DateObject شمسی


  const handleDateChange = (date) => {
    if (date instanceof DateObject) {
      const shamsi = date.format("YYYY-MM-DD"); // فقط برای نمایش
      const miladi = date.convert(gregorian).format("YYYY-MM-DD"); // برای ارسال

      setPickerValue(date); // تقویم شمسی نگه دار
      setDisplayDate(shamsi); // اینپوت فقط شمسی ببینه

      setFormData((prev) => ({
        ...prev,
        birth_date: miladi, // فقط میلادی ذخیره کن برای سرور
      }));

      console.log("📅 نمایش شمسی:", shamsi, "→ ارسال میلادی:", miladi);
    }
  };

  useEffect(() => {
    if (userData?.birth_date) {
      setDisplayDate(userData.birth_date); // شمسی
      setPickerValue(
        new DateObject({
          date: userData.birth_date,
          calendar: persian,
          locale: persian_fa,
        })
      );

      setFormData({
        first_name: userData.first_name || "",
        last_name: userData.last_name || "",
        phone_number: userData.phone_number || "",
        birth_date: userData.birth_date || "",
      });
    }
  }, [userData]);


  return (
    <div className="flex flex-col lg:flex-row">
      <aside className="bg-[#272727] w-full lg:w-1/6 p-6 border-r">
        <h2 className="text-xl font-bold mb-6 font-[Byekan] text-white">حساب کاربری من</h2>
        <nav>
          <ul className="space-y-4 flex flex-col">
            <Link
              to="/account/dashboard"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/dashboard") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaTachometerAlt />
              <span>پیشخوان</span>
            </Link>
            <Link
              to="/account/orders"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/orders") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaShoppingCart />
              <span>سفارش‌ها</span>
            </Link>
            <Link
              to="/account/userdetail"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/userdetail") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaUser />
              <span>اطلاعات حساب</span>
            </Link>
            {/* <Link
              to="/account/favorites"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/favorites") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaHeart />
              <span>علاقه‌مندی</span>
            </Link> */}
            <Link
              to="/account/logout"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/logout") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaSignOutAlt />
              <span>خروج</span>
            </Link>
          </ul>
        </nav>
      </aside>

      <main className="flex-1 py-10">
        <div className="min-w-[320px] mx-auto ">

          {isActive("/account/dashboard") ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 max-w-5xl mx-auto bg-[#272727]  p-6 rounded-lg text-white font-[Byekan]">
              <Link
                to="/account/userdetail"
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <FaUser className="text-2xl text-gray-700 mb-2" />
                <span className="text-gray-700 text-center font-[Byekan]">جزئیات حساب</span>
              </Link>
              <Link
                to="/account/orders"
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <FaShoppingCart className="text-2xl text-gray-700 mb-2" />
                <span className="text-gray-700 text-center font-[Byekan]">سفارش‌ها</span>
              </Link>
              {/* <Link
                to="/account/favorites"
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <FaHeart className="text-2xl text-gray-700 mb-2" />
                <span className="text-gray-700 text-center font-[Byekan]">علاقه‌مندی</span>
              </Link> */}
              <Link
                to="/account/logout"
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <FaSignOutAlt className="text-2xl text-gray-700 mb-2" />
                <span className="text-gray-700 text-center font-[Byekan]">خروج</span>
              </Link>
            </div>
          ) : null}

          {isActive("/account/orders") ? <BuyHistory /> : null}

          {isActive('/account/userdetail') && (
            <div className="max-w-5xl mx-auto bg-[#272727] p-6 rounded-lg text-white font-[Byekan]">
              <div className="mb-4 p-4 rounded-lg shadow bg-[#272727] text-white font-[Byekan]">
                <h2 className="text-lg font-bold mb-4">اطلاعات حساب کاربری</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">نام</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                        placeholder="نام"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">نام خانوادگی</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                        placeholder="نام خانوادگی"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">شماره تلفن</label>
                      <input
                        type="tel"
                        name="phone_number"
                        value={formData.phone_number}

                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                        placeholder="شماره تلفن"
                      />
                    </div>


                    <div className='relative w-full'>
                      <label className="block text-sm font-medium text-white">
                        تاریخ تولد
                      </label>

                      <div className="w-full relative">
                        <DatePicker
                          calendar={persian}
                          locale={persian_fa}
                          calendarPosition="bottom-center"
                          value={pickerValue}
                          onChange={handleDateChange}
                          render={(value, openCalendar) => (
                            <input
                              type="text"
                              readOnly
                              onClick={openCalendar}
                              value={displayDate}
                              placeholder="تاریخ تولد"
                              className="w-full mt-1 block rounded-md bg-[#1D1D1D] text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm cursor-pointer"
                            />
                          )}
                          inputClass="hidden"
                          calendarClass="absolute left-0 top-full mt-1 w-full bg-[#1D1D1D] text-white rounded-md shadow-lg p-2 z-50"
                          containerStyle={{ display: "block", width: "100%" }} // ✅ طول کامل و display block روی کانتینر
                        />
                      </div>


                    </div>

                  </div>

                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="py-3 px-5 font-bold bg-[#7B2C3F] text-white rounded-md shadow text-sm transition"
                    >
                      ثبت تغییرات
                    </button>
                  </div>
                </form>
              </div>

              <UserLocations />
            </div>
          )}

        </div>
      </main>
    </div>
  );
};

export default Dashboard;