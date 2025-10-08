import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import UserLocations from '../components/UserAddress';


// Simulated orders data with added fields for images and colors
const ordersData = [
  {
    id: 1,
    created_at: '1404/06/21 22:13',
    reference_id: '1267148788',
    delivery_status: 'در حال ارسال',
    delivery_time: '۱۴۰۴/۰۶/۲۱- ۲۲:۱۲',
    address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
    receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
    items: [
      {
        id: 1,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips1.jpg',
      },
      {
        id: 2,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips2.jpg',
      },
      {
        id: 3,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips3.jpg',
      },
    ],
    shipping_cost: 20000,
    original_items_total: 591000,
    total_discount_amount: 28000,
    total_discount_percentage: 5.5,
    amount_paid: 583000,
    payment_info: {
      card_holder: 'سید علی موسوی مجاب',
      card_number: '6104-14**-****-3315',
      date_time: '1404/06/21 - 23:12:56',
      tracking_number: '588371234',
      reference_id: '1267148788',
    },
    refund_info: null,
    status: 'current',
    color: 'green',
    progress: 2, // Completed stages
  },
  {
    id: 2,
    created_at: '1404/06/21 22:13',
    reference_id: '1267148788',
    delivery_status: 'تحویل شده',
    delivery_time: '۱۴۰۴/۰۶/۲۱- ۲۲:۱۲',
    address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
    receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
    items: [
      {
        id: 1,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips1.jpg',
      },
      {
        id: 2,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips2.jpg',
      },
      {
        id: 3,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips3.jpg',
      },
    ],
    shipping_cost: 20000,
    original_items_total: 591000,
    total_discount_amount: 28000,
    total_discount_percentage: 5.5,
    amount_paid: 583000,
    payment_info: {
      card_holder: 'سید علی موسوی مجاب',
      card_number: '6104-14**-****-3315',
      date_time: '1404/06/21 - 23:12:56',
      tracking_number: '588371234',
      reference_id: '1267148788',
    },
    refund_info: null,
    status: 'delivered',
    color: 'green',
    progress: 4,
    return_window: 'از ساعت 22:33 تا 23:12 این فاکتور قابلیت مرجوع کردن دارد.',
  },
  {
    id: 3,
    created_at: '1404/06/21 22:13',
    reference_id: '1267148788',
    delivery_status: 'مرجوع شده، تا ساعت ۲۲:۳۰ پیک بسته را از شما تحویل میگیرد.',
    delivery_time: '۱۴۰۴/۰۶/۲۱- ۲۲:۱۲',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز.',
    address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
    receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
    items: [
      {
        id: 1,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips1.jpg',
      },
      {
        id: 2,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips2.jpg',
      },
      {
        id: 3,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips3.jpg',
      },
    ],
    shipping_cost: 20000,
    original_items_total: 591000,
    total_discount_amount: 28000,
    total_discount_percentage: 5.5,
    amount_paid: 583000,
    payment_info: {
      card_holder: 'سید علی موسوی مجاب',
      card_number: '6104-14**-****-3315',
      date_time: '1404/06/21 - 23:12:56',
      tracking_number: '588371234',
      reference_id: '1267148788',
    },
    refund_info: {
      account_holder: 'سید علی موسوی مجاب',
      status: 'تایید شده',
      date_time: '1404/06/21 - 23:12:56',
      wallet_link: 'مشاهده کیف پول',
    },
    status: 'returned',
    color: 'orange',
    progress: 4,
  },
  {
    id: 4,
    created_at: '1404/06/21 22:13',
    reference_id: '1267148788',
    delivery_status: 'لغو به دلیل تصادف پیک.',
    delivery_time: '-',
    description: 'لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی مورد نیاز.',
    address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
    receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
    items: [
      {
        id: 1,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips1.jpg',
      },
      {
        id: 2,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips2.jpg',
      },
      {
        id: 3,
        product_name: 'چیپس نمکی مزمز',
        product_weight: '۶۰ گرم',
        unit_price: 1000,
        original_unit_price: 3553543,
        discount_percentage: 23,
        quantity: 1,
        total_price: 1000,
        product_image: 'https://example.com/chips3.jpg',
      },
    ],
    shipping_cost: 20000,
    original_items_total: 591000,
    total_discount_amount: 28000,
    total_discount_percentage: 5.5,
    amount_paid: 583000,
    payment_info: {
      card_holder: 'سید علی موسوی مجاب',
      card_number: '6104-14**-****-3315',
      date_time: '1404/06/21 - 23:12:56',
      tracking_number: '588371234',
      reference_id: '1267148788',
    },
    refund_info: {
      account_holder: 'سید علی موسوی مجاب',
      status: 'تایید شده',
      date_time: '1404/06/21 - 23:12:56',
      wallet_link: 'مشاهده کیف پول',
    },
    status: 'canceled',
    color: 'red',
    progress: 0,
  },
];



// Utility functions
const formatNumber = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
const formatJalaliVerbose = (date) => 'پنج‌شنبه ۲۱ شهریور ماه';

// Get color classes based on order color
const getColorClass = (color, type = 'bg') => {
  if (color === 'green') return `${type}-green-500`;
  if (color === 'orange') return `${type}-orange-500`;
  if (color === 'red') return `${type}-red-500`;
  return `${type}-gray-500`;
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children, onSubmit }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-gray-800 font-[Byekan]">{title}</h2>
        {children}
        <div className="flex justify-end mt-6 space-x-3 rtl:space-x-reverse">
          <button
            onClick={onClose}
            className="bg-gray-200 text-gray-700 px-5 py-2 rounded-lg font-[Byekan] hover:bg-gray-300 transition"
          >
            بستن
          </button>
          {onSubmit && (
            <button
              onClick={onSubmit}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg font-[Byekan] hover:bg-blue-700 transition"
            >
              تأیید و ثبت
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

// Order Item Component
const OrderItem = ({ item, index }) => (
  <tr className="border-b border-gray-200">
    <td className="p-3 text-center text-white font-[Byekan]">{index + 1}.</td>
    <td className="p-3 text-white font-[Byekan]">
      <div>{item.product_name}</div>
      {item.product_weight && <div className="text-sm text-gray-500">{item.product_weight}</div>}
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">{formatNumber(item.quantity)} عدد</td>
    <td className="p-3 text-center text-white font-[Byekan]">{formatNumber(item.original_unit_price)} تومان</td>
    <td className="p-3 text-center text-white font-[Byekan]">
      {item.discount_percentage ? (
        <span className="text-orange-500">{item.discount_percentage}% {formatNumber(item.original_unit_price - item.unit_price)} تومان</span>
      ) : '-'}
    </td>
    <td className="p-3 text-center text-white font-[Byekan]">{formatNumber(item.total_price)} تومان</td>
  </tr>
);

// Progress Bar Component
const ProgressBar = ({ order }) => {
  const stages = ['آدرس', 'پرداخت', 'ارسال', 'تحویل'];
  const colorClass = getColorClass(order.color, 'bg');
  const textColorClass = getColorClass(order.color, 'text');
  const isCanceled = order.status === 'canceled';

  return (
    <div className="flex items-center justify-between mb-4">
      {stages.map((stage, index) => (
        <div key={stage} className="flex items-center">
          <div className="relative">
            <div className={`w-6 h-6 rounded-full ${index < order.progress ? colorClass : 'bg-white'} border-2 border-${order.color}-500 flex items-center justify-center`}>
              {isCanceled ? (
                <span className={textColorClass}>X</span>
              ) : (
                index < order.progress && <span className="text-white">✓</span>
              )}
            </div>
            <div className="absolute top-8 left-1/2 transform -translate-x-1/2 text-sm text-gray-600 font-[Byekan] whitespace-nowrap">
              {stage}
            </div>
          </div>
          {index < stages.length - 1 && (
            <div className={`flex-1 h-0.5 mx-2 ${index < order.progress - 1 ? colorClass : 'bg-gray-300'}`}></div>
          )}
        </div>
      ))}
    </div>
  );
};

// Order Component
const Order = ({ order }) => {
  const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);
  const [isReturnModalOpen, setIsReturnModalOpen] = useState(false);
  const [cancelReason, setCancelReason] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const statusColor = getColorClass(order.color, 'text');

  const handleCancelSubmit = () => {
    setSuccessMessage('درخواست شما با موفقیت ثبت گردید، گزارش شما درصورت تایید همکاران ما تا یک ساعت آینده به کیف پول شما واریز خواهد شد.');
    setTimeout(() => {
      setIsCancelModalOpen(false);
      setSuccessMessage('');
    }, 2000);
  };

  const handleReturnSubmit = () => {
    setSuccessMessage('درخواست شما با موفقیت ثبت گردید، گزارش شما درصورت تایید همکاران ما تا یک ساعت آینده به کیف پول شما واریز خواهد شد.');
    setTimeout(() => {
      setIsReturnModalOpen(false);
      setSuccessMessage('');
    }, 2000);
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white font-[Byekan]">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-bold">{formatJalaliVerbose(order.created_at)}</h3>
        <div className="text-sm text-gray-200">
          {order.created_at}   |   {order.reference_id || '-'}   |   پرداخت آنلاین
        </div>
      </div>
      <div className="mb-4">
        <span className="font-bold">وضعیت: </span>
        <span className={statusColor}>{order.delivery_status}</span>
      </div>
      <ProgressBar order={order} />
      <div className="flex justify-center gap-4 mb-4">
        {order.items.map((item) => (
          <img key={item.id} src={item.product_image} alt={item.product_name} className="w-16 h-16 object-cover rounded" />
        ))}
      </div>
      <div className="mb-4">
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
      <div className="flex justify-between text-sm mb-4 border-t border-gray-600 pt-4">
        <div>هزینه ارسال <br /> {formatNumber(order.shipping_cost)} </div>
        <div>جمع سفارش <br /> {formatNumber(order.original_items_total)}</div>
        <div>جمع تخفیف <br /> {formatNumber(order.total_discount_amount)}</div>
        <div>قابل پرداخت <br /> {formatNumber(order.total_discount_percentage)}%</div>
        <div>مبلغ نهایی <br /> {formatNumber(order.amount_paid)}</div>
      </div>
      <div className="text-sm mb-4">
        <div className="font-bold mb-2">اطلاعات پرداخت</div>
        <div>صاحب کارت: {order.payment_info.card_holder}</div>
        <div>کارت مبدا: {order.payment_info.card_number}</div>
        <div>تاریخ و زمان: {order.payment_info.date_time}</div>
        <div>شماره پیگیری: {order.payment_info.tracking_number}</div>
        <div>شماره مرجع: {order.payment_info.reference_id}</div>
      </div>
      {order.refund_info && (
        <div className="text-sm mb-4">
          <div className="font-bold mb-2">اطلاعات برگشت وجه</div>
          <div>صاحب اکانت: {order.refund_info.account_holder}</div>
          <div>وضعیت درخواست: {order.refund_info.status}</div>
          <div>تاریخ و زمان: {order.refund_info.date_time}</div>
          <div>لینک پیگیری: <a href="#" className="text-blue-500">{order.refund_info.wallet_link}</a></div>
        </div>
      )}
      {order.description && (
        <div className="text-sm mb-4 text-red-500">
          توضیحات: {order.description}
        </div>
      )}
      {order.return_window && (
        <div className="text-sm mb-4 text-gray-400">
          {order.return_window}
        </div>
      )}
      <div className="flex justify-end gap-4">
        {order.status === 'delivered' && (
          <>
            <button onClick={() => setIsReturnModalOpen(true)} className="bg-orange-500 text-white px-4 py-2 rounded">
              مرجوع کردن کالا
            </button>
          </>
        )}
        <button className="bg-green-500 text-white px-4 py-2 rounded">
          سفارش مجدد فاکتور
        </button>
        {(order.status === 'current') && (
          <button onClick={() => setIsCancelModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
            لغو سفارش
          </button>
        )}
      </div>

      {/* Cancel Modal */}
      <Modal
        isOpen={isCancelModalOpen}
        onClose={() => setIsCancelModalOpen(false)}
        title="دلیل لغو سفارش"
        onSubmit={handleCancelSubmit}
      >
        {successMessage ? (
          <div className="text-green-500">{successMessage}</div>
        ) : (
          <>
            <select
              value={cancelReason}
              onChange={(e) => setCancelReason(e.target.value)}
              className="w-full p-2 border rounded mb-4"
            >
              <option value="">انتخاب کنید</option>
              <option value="دیر کرد در ارسال">دیر کرد در ارسال</option>
              <option value="نبودن در خانه">نبودن در خانه</option>
            </select>
            <textarea
              placeholder="دلیل"
              className="w-full p-2 border rounded"
            ></textarea>
          </>
        )}
      </Modal>

      {/* Return Modal */}
      <Modal
        isOpen={isReturnModalOpen}
        onClose={() => setIsReturnModalOpen(false)}
        title="دلیل مرجوع کردن سفارش"
        onSubmit={handleReturnSubmit}
      >
        {successMessage ? (
          <div className="text-green-500">{successMessage}</div>
        ) : (
          <>
            <div className="mb-4">
              <h4>انتخاب کالای مرجوعی</h4>
              {order.items.map((item) => (
                <div key={item.id} className="flex justify-between">
                  <div>
                    {item.product_name} ({item.product_weight})
                  </div>
                  <div>{formatNumber(item.total_price)} تومان</div>
                </div>
              ))}
            </div>
            <textarea
              placeholder="دلیل"
              className="w-full p-2 border rounded"
            ></textarea>
          </>
        )}
      </Modal>
    </div>
  );
};


// BuyHistory Component
const BuyHistory = () => {
  const [activeTab, setActiveTab] = useState('current');

  const filteredOrders = ordersData.filter((order) => {
    if (activeTab === 'all') return true;
    return order.status === activeTab;
  });

  return (
    <div className="max-w-5xl mx-auto bg-[#272727]  p-6 rounded-lg text-white font-[Byekan]">
      <h1 className="text-2xl font-bold mb-6">تاریخچه سفارشات</h1>

      {/* Tabs */}
      <div className="flex gap-4 mb-6">
        {['current', 'delivered', 'returned', 'canceled'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded ${activeTab === tab ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
          >
            {tab === 'current' ? 'جاری' : tab === 'delivered' ? 'تحویل داده شده' : tab === 'returned' ? 'مرجوع شده' : 'لغو شده'}
          </button>
        ))}
      </div>

      {/* Orders List */}
      {filteredOrders.length > 0 ? (
        filteredOrders.map((order) => <Order key={order.id} order={order} />)
      ) : (
        <div className="text-center text-gray-500">هیچ سفارشی یافت نشد.</div>
      )}
    </div>
  );
};

// Main Dashboard Component
const Dashboard = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    displayName: "mahid",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("ارسال به API:", formData);
  };

  const location = useLocation();
  const isActive = (path) => location.pathname === path;

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
            <Link
              to="/account/favorites"
              className={`font-[Byekan] flex items-center space-x-2 rtl:space-x-reverse text-lg ${isActive("/account/favorites") ? "text-[#C5A253]" : "text-white"}`}
            >
              <FaHeart />
              <span>علاقه‌مندی</span>
            </Link>
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
        <div className="min-w-[320px] mx-auto">

          {isActive("/account/dashboard") ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
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
              <Link
                to="/account/favorites"
                className="flex flex-col items-center justify-center p-4 bg-gray-100 rounded-md shadow hover:bg-gray-200 transition"
              >
                <FaHeart className="text-2xl text-gray-700 mb-2" />
                <span className="text-gray-700 text-center font-[Byekan]">علاقه‌مندی</span>
              </Link>
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
            <div className="max-w-5xl mx-auto bg-[#272727]  p-6 rounded-lg text-white font-[Byekan]">

              <div
                className="mb-4 p-4 rounded-lg shadow bg-[#272727] text-white font-[Byekan]"
              >

                <h2 className="text-lg font-bold mb-4">اطلاعات حساب کاربری</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium">نام</label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                        placeholder="نام"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">نام خانوادگی</label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
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
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                        placeholder="شماره تلفن"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium">تاریخ تولد</label>
                      <input
                        type="date"
                        name="birthDate"
                        value={formData.birthDate}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md bg-[#1D1D1D] border-gray-600 text-white shadow-sm focus:ring-0 focus:border-[#C5A253] p-4 text-sm"
                      />
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

          {isActive("/account/favorites") && (
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
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;