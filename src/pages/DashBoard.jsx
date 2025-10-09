import React, { useState, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FaTachometerAlt, FaShoppingCart, FaUser, FaHeart, FaSignOutAlt, FaCreditCard, FaMapMarkerAlt, FaEdit, FaTrash } from 'react-icons/fa';
import UserLocations from '../components/UserAddress';


// Simulated orders data with added fields for images and colors
const ordersData = [
  // {
  //   id: 1,
  //   created_at: '1404/06/21 22:13',
  //   reference_id: '1267148788',
  //   delivery_status: "تحویل شده",
  //   delivery_time: '۱۴۰۴/۰۶/۲۱- ۲۲:۱۲',
  //   address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
  //   receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
  //   items: [
  //     {
  //       id: 1,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips1.jpg',
  //     },
  //     {
  //       id: 2,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips2.jpg',
  //     },
  //     {
  //       id: 3,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips3.jpg',
  //     },
  //   ],
  //   shipping_cost: 20000,
  //   original_items_total: 591000,
  //   total_discount_amount: 28000,
  //   total_discount_percentage: 5.5,
  //   amount_paid: 583000,
  //   payment_info: {
  //     card_holder: 'سید علی موسوی مجاب',
  //     card_number: '6104-14**-****-3315',
  //     date_time: '1404/06/21 - 23:12:56',
  //     tracking_number: '588371234',
  //     reference_id: '1267148788',
  //   },
  //   refund_info: null,
  //   status: 'current',
  //   color: 'green',
  //   progress: 2, // Completed stages
  // },
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
    progress: 4,
  },
  // {
  //   id: 5,
  //   created_at: '1404/06/21 22:13',
  //   reference_id: '1267148788',
  //   delivery_status: 'در حال ارسال',
  //   delivery_time: '۱۴۰۴/۰۶/۲۱- ۲۲:۱۲',
  //   address: 'بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴',
  //   receiver: 'سید علی موسوی مجاب | ۰۹۱۲۱۴۰۰۷۱۲',
  //   items: [
  //     {
  //       id: 1,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips1.jpg',
  //     },
  //     {
  //       id: 2,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips2.jpg',
  //     },
  //     {
  //       id: 3,
  //       product_name: 'چیپس نمکی مزمز',
  //       product_weight: '۶۰ گرم',
  //       unit_price: 1000,
  //       original_unit_price: 3553543,
  //       discount_percentage: 23,
  //       quantity: 1,
  //       total_price: 1000,
  //       product_image: 'https://example.com/chips3.jpg',
  //     },
  //   ],
  //   shipping_cost: 20000,
  //   original_items_total: 591000,
  //   total_discount_amount: 28000,
  //   total_discount_percentage: 5.5,
  //   amount_paid: 583000,
  //   payment_info: {
  //     card_holder: 'سید علی موسوی مجاب',
  //     card_number: '6104-14**-****-3315',
  //     date_time: '1404/06/21 - 23:12:56',
  //     tracking_number: '588371234',
  //     reference_id: '1267148788',
  //   },
  //   refund_info: null,
  //   status: 'current',
  //   color: 'green',
  //   progress: 2, // Completed stages
  // },
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


const getStageColor = (status) => {
  if (status.includes("لغو")) {
    return "#EF4444"; // قرمز برای لغو
  } else if (status.includes("مرجوع")) {
    return "#F59E0B"; // نارنجی برای مرجوع
  }
  switch (status) {
    case "ثبت شده":
      return "#3B82F6";
    case "در حال آماده‌سازی":
      return "#3B82F6";
    case "در حال ارسال":
      return "#22C55E"; // سبز
    case "تحویل شده":
      return "#16A34A"; // سبز پررنگ
    default:
      return "#A3A3A3";
  }
};
const getProgressFromStatus = (deliveryStatus) => {
  if (deliveryStatus.includes("لغو") || deliveryStatus.includes("مرجوع")) {
    return 4;
  }
  switch (deliveryStatus) {
    case "ثبت شده":
      return 1;
    case "در حال آماده‌سازی":
      return 2;
    case "در حال ارسال":
      return 3;
    case "تحویل شده":
      return 4;
    default:
      return 1;
  }
};

const ProgressBar = ({ order }) => {
  const stages = ["تایید شده", "آماده‌سازی", "تحویل به پیک", "تحویل"]; // ترتیب طبیعی، با CSS معکوس میشه

  if (!order || !order.delivery_status) {
    return <div className="text-red-500 font-[Byekan] text-sm">خطا: اطلاعات سفارش معتبر نیست.</div>;
  }

  const progress = getProgressFromStatus(order.delivery_status);
  const color = getStageColor(order.delivery_status);
  const isCanceled = order.delivery_status.includes("لغو") || order.delivery_status.includes("مرجوع");

  const stageStyles = useMemo(() => {
    return stages.map((_, index) => {
      const isCompleted = index < progress - 1;
      const isCurrent = index === progress - 1;

      let bgColor = "white";
      let borderColor = "#D1D5DB";
      let icon = null;

      if (isCanceled) {
        bgColor = getStageColor(order.delivery_status); // رنگ بر اساس نوع (قرمز یا نارنجی)
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
    <div
      className="flex items-center justify-between mb-8 w-full flex-row "
      role="progressbar"
      aria-label={`وضعیت سفارش: ${order.delivery_status}`}
    >
      {stages.map((stage, index) => {
        const { bgColor, borderColor, icon, isCompleted, isCurrent } = stageStyles[index];

        return (
          <div key={stage} className="flex items-center w-full relative">
            {/* دایره */}
            <div className="relative flex flex-col items-center">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all duration-300"
                style={{ backgroundColor: bgColor, borderColor }}
                aria-hidden="true"
              >
                {icon}
              </div>
              {/* عنوان */}
              <div className="absolute top-10 text-sm text-gray-300 font-[Byekan] text-center whitespace-nowrap">
                {stage}
              </div>
            </div>

            {/* خط بین استیج‌ها */}
            {index < stages.length - 1 && (
              <div className="flex-1 h-1 mx-2 relative" dir='rtl'>
                {/* پس‌زمینه خاکستری */}
                <div className="absolute top-0 right-0 w-full h-full bg-gray-600 rounded-full" dir='rtl'></div>

                {/* بخش رنگی */}
                <div
                  className="absolute top-0 right-0 h-full rounded-full transition-all duration-500" dir='rtl'
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
  const [cancelReason, setCancelReason] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [successMessage, setSuccessMessage] = useState('');
  const statusColor = getColorClass(order.color, 'text');

  const handleCancelSubmit = () => {
    setSuccessMessage('درخواست شما با موفقیت ثبت گردید، گزارش شما درصورت تایید همکاران ما تا یک ساعت آینده به کیف پول شما واریز خواهد شد.');
  };

  const handleReturnSubmit = () => {
    setSuccessMessage('درخواست شما با موفقیت ثبت گردید، گزارش شما درصورت تایید همکاران ما تا یک ساعت آینده به کیف پول شما واریز خواهد شد.');
  };

  return (
    <div className="bg-gray-800 p-6 rounded-lg shadow-md mb-6 text-white font-[Byekan]">
      <div className="flex md:flex-row flex-col justify-between items-start gap-3 md:items-center mb-4">
        <h3 className="text-lg text-[#C5A253] font-bold">{formatJalaliVerbose(order.created_at)}</h3>
        <div className="text-md text-gray-200 flex flex-col sm:flex-row-reverse gap-4 ">
          <span>{order.created_at}</span>
          <span className='hidden sm:block'>|</span>
          <span>{order.reference_id || '-'}</span>
          <span className='hidden sm:block'>|</span>
          <span className='flex flex-row gap-3 items-center'>
            <FaCreditCard className="text-white" />پرداخت آنلاین
          </span>
        </div>
      </div>

      <div className="mb-4">
        <span className="font-bold">وضعیت: </span>
        <span className={statusColor}>{order.delivery_status}</span>
      </div>

      <div className="flex justify-center items-center w-full">
        <ProgressBar order={order} />
      </div>

      {/* نمایش آدرس و اطلاعات گیرنده در صورت تحویل‌شده بودن سفارش */}
      {order.status === 'delivered' && (
        <div className="text-sm mb-4 mt-4">
          <div>آدرس: {order.address}</div>
          <div>گیرنده: {order.receiver}</div>
          <div>زمان تحویل: {order.delivery_time}</div>
        </div>
      )}

      {(order.status === 'returned' || order.status === 'canceled') && order.description && (
        <div>
          توضیحات:
          <span className="text-sm mb-4 text-red-500">
            {order.description}
          </span>
        </div>
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
        {order.status === 'current' && (
          <button onClick={() => setIsCancelModalOpen(true)} className="bg-red-500 text-white px-4 py-2 rounded">
            لغو سفارش
          </button>
        )}
      </div>

      {/* Cancel Modal */}
      <div
        className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${isCancelModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
                  setCancelReason('');
                  setSuccessMessage('');
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
                    setCancelReason('');
                    setSuccessMessage('');
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    if (cancelReason) {
                      handleCancelSubmit();
                    }
                  }}
                  className={`bg-red-800 text-white px-4 py-2 rounded ${cancelReason ? 'hover:bg-red-700' : 'opacity-50 cursor-not-allowed'
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
        className={`fixed inset-0 bg-black/50 flex justify-center items-center transition-opacity duration-300 ${isReturnModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
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
                  setSuccessMessage('');
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
                            prev.includes(item.id)
                              ? prev.filter((id) => id !== item.id)
                              : [...prev, item.id]
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
                    setSuccessMessage('');
                  }}
                  className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600"
                >
                  لغو
                </button>
                <button
                  onClick={() => {
                    if (selectedItems.length > 0) {
                      handleReturnSubmit();
                    }
                  }}
                  className={`bg-red-800 text-white px-4 py-2 rounded ${selectedItems.length > 0 ? 'hover:bg-red-700' : 'opacity-50 cursor-not-allowed'
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

        </div>
      </main>
    </div>
  );
};

export default Dashboard;