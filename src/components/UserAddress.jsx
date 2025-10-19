import React, { useEffect } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import AddressModal from "./AddressModal";
import {
  fetchAddresses,
  editAddress,
  submitAddress,
  setActiveAddress,
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

      <div className="mt-4 space-y-4">
        {addresses?.length > 0 ? (
          addresses.map((addr) => (
            <div
              key={addr.id}
              className="p-4 rounded-lg shadow bg-[#2e2e2e] text-white font-[Byekan] border border-gray-700"
            >

              {console.log(addresses)}

              <div>
                <div className="text-yellow-500 text-lg mb-4 font-semibold">

                  <label className="flex items-center mt-2 gap-4 cursor-pointer">
                    <input
                      type="radio"
                      name="addressSelect"
                      className="select-address-radio mr-2 accent-yellow-500"
                      value={addr.id}
                      checked={addr.is_active}
                      onChange={() => dispatch(setActiveAddress(addr.id))}
                    />
                    <p>آدرس {addr.address || "بدون عنوان"}</p>
                  </label>
                </div>
                <div className=" flex flex-col sm:flex-row items-start sm:items-center gap-4 ">

                  <div className="w-full sm:w-auto">
                    <img
                      src={
                        addr.latitude && addr.longitude
                          ? `https://api.neshan.org/v1/static?key=service.3605b54b29cb422683404bdb9e64f178&type=standard-day&center=${Number(
                            addr.latitude
                          ).toFixed(6)},${Number(addr.longitude).toFixed(6)}&zoom=17&width=320&height=180&marker=${Number(
                            addr.latitude
                          ).toFixed(6)},${Number(addr.longitude).toFixed(6)}`
                          : "https://via.placeholder.com/320x180?text=بدون+مختصات"
                      }
                      alt="نقشه"
                      className="w-full sm:w-60 h-40 object-cover rounded"
                    />
                  </div>
                  <div className="flex-1 flex flex-col gap-2 text-right">

                    <p className="text-sm truncate">{addr.address}</p>
                    <p className="text-sm">کد پستی: {addr.postal_code || addr.postalCode || '—'}</p>
                    <p className="text-sm">پلاک: {addr.notes || addr.plate || '—'}</p>
                    <p className="text-sm">
                      {addr.receiver_full_name && addr.receiver_phone
                        ? `${addr.receiver_full_name} - ${addr.receiver_phone}`
                        : '—'}
                    </p>
                  </div>
                  <div className="flex gap-2 mt-2 justify-end">
                    <button
                      onClick={() => handleEdit(addr.id)}
                      className="text-white hover:bg-gray-600 p-2 bg-gray-700 rounded-md transition-colors"
                      title="ویرایش آدرس"
                    >
                      <FaEdit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-white hover:bg-gray-600 p-2 bg-gray-700 rounded-md transition-colors"
                      title="حذف آدرس"
                    >
                      <FaTrash className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>


            </div>
          ))
        ) : (
          <p className="text-sm text-gray-400">هیچ آدرسی ثبت نشده است.</p>
        )}
      </div>

      {/* دکمه افزودن آدرس جدید */}
      <div className="flex justify-center mt-6">
        <AddressModal />
      </div>
    </div>
  );
};

export default UserLocations;
