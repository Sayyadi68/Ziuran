import React from "react";
import { FaEdit, FaTrash } from "react-icons/fa";

// Simulated address data
const userAddresses = [
  {
    id: 1,
    name: "خانه",
    phone: "۰۹۱۲۳۴۵۶۷۸۹",
    address:
      "بل دانشگاه، پل نواب، ب. اندیشه، م. اندیشه 13، مجتمع مطبوعات، بلوک ب، واحد ۲۴",
    postalCode: "12345",
    naberhood:"تهران",
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
    naberhood:"تهران",
    plate: "34",
    mapImage: "https://via.placeholder.com/300x150?text=Map+2",
    isDefault: false,
  },
];

const UserLocations = () => {
  return (
    <div className=" bg-[#272727] rounded-xl p-8">
      <h2 className="text-lg font-bold text-white mb-4 font-[Byekan]">
        آدرس‌های من
      </h2>

      {userAddresses.map((addr) => (
        <div
          key={addr.id}
          className="mb-4 p-4 bg-gray-800 rounded-lg shadow text-white font-[Byekan] flex items-start gap-4"
        >
          <img
            src={addr.mapImage}
            alt="نقشه"
            className="w-40 h-20 object-cover rounded"
          />
          <div className="flex-1">
            <div className="text-yellow-500 text-sm mb-1">
              آدرس {addr.name}
            </div>
            <p className="text-sm mb-1">{addr.address}</p>
            <p className="text-sm mb-1">کد پستی: {addr.postalCode}</p>
            <p className="text-sm mb-1">پلاک: {addr.plate}</p>
            <p className="text-sm">تلفن: {addr.phone}</p>
          </div>
          <div className="flex gap-2">
            <button className="text-white hover:text-gray-300">
              <FaEdit />
            </button>
            <button className="text-white hover:text-gray-300">
              <FaTrash />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserLocations;
