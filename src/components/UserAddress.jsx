import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useSelector, useDispatch } from 'react-redux';
import AddressModal from './AddressModal';
import { fetchAddresses, editAddress } from '../redux/addressSlice';



const UserLocations = () => {
  const dispatch = useDispatch();
  const { addresses } = useSelector((state) => state.address);

  React.useEffect(() => {
    dispatch(fetchAddresses()); // ✅ حالا درست کار می‌کند
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(editAddress(id));
  };

  // اگر هنوز آدرسی وجود ندارد، داده‌ی فرضی نمایش بده
  const addressList = addresses.length > 0 ? addresses : [
    {
      id: 1,
      name: "خانه",
      phone: "۰۹۱۲۳۴۵۶۷۸۹",
      address: "بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴",
      postalCode: "12345",
      naberhood: "تهران",
      plate: "12",
      mapImage: "https://via.placeholder.com/300x150?text=Map+1",
      isDefault: true,
    },
    {
      id: 2,
      name: "دفتر کار",
      phone: "۰۹۱۸۹۰۱۲۳۴۵",
      address: "خیابان اصلی، کوچه ۵، پلاک ۱۰",
      postalCode: "67890",
      naberhood: "تهران",
      plate: "34",
      mapImage: "https://via.placeholder.com/300x150?text=Map+2",
      isDefault: false,
    },
  ];

  return (
    <div className="bg-[#272727] rounded-xl p-8">
      <h2 className="text-lg font-bold text-white mb-4 font-[Byekan]">
        آدرس‌های من
      </h2>

      {/* دکمه و مودال داخل AddressModal */}
      <AddressModal provinces={[]} />

      {addressList.map((addr) => (
        <div
          key={addr.id}
          className="mb-4 p-4 rounded-lg shadow bg-[#272727] text-white font-[Byekan] flex flex-col md:flex-row items-start md:items-center gap-4"
        >
          <img
            src={addr.mapImage}
            alt="نقشه"
            className="w-full md:w-40 h-40 md:h-20 object-cover rounded"
          />

          <div className="flex-1 flex flex-col gap-1">
            <div className="text-yellow-500 text-sm font-semibold">
              آدرس {addr.name}
            </div>
            <p className="text-sm">{addr.address}</p>
            <p className="text-sm">کد پستی: {addr.postalCode}</p>
            <p className="text-sm">پلاک: {addr.plate}</p>
            <p className="text-sm">تلفن: {addr.phone}</p>
          </div>

          <div className="flex gap-2 mt-2 md:mt-0">
            <button
              onClick={() => handleEdit(addr.id)}
              className="text-white hover:text-gray-300 p-2 bg-gray-700 rounded-md"
            >
              <FaEdit />
            </button>
            <button className="text-white hover:text-gray-300 p-2 bg-gray-700 rounded-md">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLocations;
