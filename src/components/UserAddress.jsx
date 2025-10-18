import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AddressModal from "./AddressModal";
import {
  fetchAddresses,
  editAddress,
  submitAddress,
} from "../redux/addressSlice";

const UserLocations = () => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  // 📦 گرفتن لیست آدرس‌ها هنگام بارگذاری صفحه
  useEffect(() => {
    dispatch(fetchAddresses());
  }, [dispatch]);

  // ✏️ ویرایش آدرس
  const handleEdit = (id) => {
    dispatch(editAddress(id));
  };

  // 🗑️ حذف آدرس (در آینده می‌تونی API حذف بسازی)
  const handleDelete = (id) => {
    if (window.confirm("آیا از حذف این آدرس مطمئن هستید؟")) {
      console.log("در اینجا می‌تونی API حذف را صدا بزنی", id);
    }
  };

  // ✨ نمایش آدرس‌ها یا پیغام در صورت نبود
  if (!addresses || addresses.length === 0) {
    return (
      <div className="bg-[#272727] rounded-xl p-8 text-center text-white font-[Byekan]">
        <h2 className="text-lg font-bold mb-4">آدرس‌های من</h2>
        <p className="text-gray-300 mb-6">شما هنوز هیچ آدرسی ثبت نکرده‌اید.</p>
        <AddressModal />
      </div>
    );
  }

  return (
    <div className="bg-[#272727] rounded-xl p-8">
      <h2 className="text-lg font-bold text-white mb-4 font-[Byekan]">
        آدرس‌های من
      </h2>

      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="mb-4 p-4 rounded-lg shadow bg-[#2e2e2e] text-white font-[Byekan] flex flex-col md:flex-row items-start md:items-center gap-4 border border-gray-700"
        >
          {/* نقشه یا تصویر */}
          <img
            src={
              addr.latitude && addr.longitude
                ? `https://api.neshan.org/v1/static?key=service.3605b54b29cb422683404bdb9e64f178&type=standard-day&center=${Number(
                  addr.latitude
                ).toFixed(6)},${Number(addr.longitude).toFixed(
                  6
                )}&zoom=17&width=320&height=180&marker=${Number(
                  addr.latitude
                ).toFixed(6)},${Number(addr.longitude).toFixed(6)}`
                : "https://via.placeholder.com/320x180?text=بدون+مختصات"
            }

            alt="نقشه"
            className="w-full md:w-60 h-40 md:h-40 object-cover rounded"
          />

          {/* اطلاعات آدرس */}
          <div className="flex-1 flex flex-col gap-1 text-right">
            <div className="text-yellow-500 text-sm font-semibold">
              آدرس {addr.name || "بدون عنوان"}
            </div>
            <p className="text-sm">{addr.address}</p>
            <p className="text-sm">کد پستی: {addr.postal_code || addr.postalCode}</p>
            <p className="text-sm">پلاک: {addr.notes || addr.plate}</p>
            <p className="text-sm">
              تلفن: {addr.receiver_phone || addr.phone || "—"}
            </p>
          </div>

          {/* دکمه‌ها */}
          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => handleEdit(addr.id)}
              className="text-white hover:text-gray-300 p-2 bg-gray-700 rounded-md"
              title="ویرایش آدرس"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelete(addr.id)}
              className="text-white hover:text-gray-300 p-2 bg-gray-700 rounded-md"
              title="حذف آدرس"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      ))}

      {/* دکمه افزودن آدرس جدید */}
      <div className="flex justify-center mt-6">
        <AddressModal />
      </div>
    </div>
  );
};

export default UserLocations;
