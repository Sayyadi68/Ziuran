import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {
  setModalOpen,
  setFormData,
  setReceiverSelf,
  setErrors,
  resetForm,
  fetchAddress,
  fetchCities,
  submitAddress,
  editAddress,
} from '../redux/addressSlice';

const AddressModal = ({ provinces }) => {
  const dispatch = useDispatch();
  const { isModalOpen, formData, isReceiverSelf, method, addressId, errors, cities } = useSelector(
    (state) => state.address
  );
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const initialLat = 34.639944;
  const initialLng = 50.875942;

  const showTailwindMessage = (message, type) => {
    console.log(`${type}: ${message}`);
    // Implement Tailwind-based toast notification here if needed
  };

  const initMap = (lat, lng) => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      mapInstanceRef.current.setView([lat, lng], 13);
      return;
    }

    const mapContainer = mapRef.current;
    if (!mapContainer) return;

    mapInstanceRef.current = L.map(mapContainer, {
      center: [lat, lng],
      zoom: 13,
    });

    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(mapInstanceRef.current);

    const enableForcedDrag = (map) => {
      let startPoint = null;
      const mc = map.getContainer();

      const safePanBy = (dx, dy) => {
        if (!map) return;
        map.panBy([dx, dy], { animate: false });
      };

      mc.addEventListener("mousedown", (e) => {
        startPoint = { x: e.clientX, y: e.clientY };
        map.dragging.disable();
      });
      mc.addEventListener("mousemove", (e) => {
        if (!startPoint) return;
        safePanBy(startPoint.x - e.clientX, startPoint.y - e.clientY);
        startPoint = { x: e.clientX, y: e.clientY };
      });
      mc.addEventListener("mouseup", () => {
        startPoint = null;
        map.dragging.enable();
      });

      mc.addEventListener("touchstart", (e) => {
        const t = e.touches[0];
        startPoint = { x: t.clientX, y: t.clientY };
        map.dragging.disable();
      });
      mc.addEventListener("touchmove", (e) => {
        if (!startPoint) return;
        const t = e.touches[0];
        safePanBy(startPoint.x - t.clientX, startPoint.y - t.clientY);
        startPoint = { x: t.clientX, y: t.clientY };
      });
      mc.addEventListener("touchend", () => {
        startPoint = null;
        map.dragging.enable();
      });
    };

    enableForcedDrag(mapInstanceRef.current);
    mapInstanceRef.current.invalidateSize();
  };

  const openModal = () => {
    dispatch(setModalOpen(true));
    setTimeout(() => initMap(initialLat, initialLng), 300);
  };

  const closeModal = () => {
    dispatch(setModalOpen(false));
    dispatch(resetForm());
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    dispatch(setFormData({ [name]: value }));
    dispatch(setErrors({ ...errors, [name]: '' }));
  };

  const handleProvinceChange = (e) => {
    const provinceId = e.target.value;
    dispatch(setFormData({ province: provinceId, city: '' }));
    if (provinceId) {
      dispatch(fetchCities(provinceId));
    }
  };

  const handleSelectLocation = () => {
    if (!mapInstanceRef.current) return;
    const center = mapInstanceRef.current.getCenter();
    dispatch(setFormData({ latitude: center.lat, longitude: center.lng }));
    dispatch(fetchAddress({ lat: center.lat, lon: center.lng }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    const requiredFields = [
      { key: 'province', name: 'استان' },
      { key: 'city', name: 'شهر' },
      { key: 'address', name: 'نشانی' },
      { key: 'postal_code', name: 'کد پستی' },
    ];

    requiredFields.forEach(({ key, name }) => {
      if (!formData[key].trim()) {
        newErrors[key] = `${name} الزامی است`;
      }
    });

    if (!/^\d{0,10}$/.test(formData.postal_code)) {
      newErrors.postal_code = 'کد پستی باید فقط شامل عدد و حداکثر ۱۰ رقم باشد';
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch(setErrors(newErrors));
      return;
    }

    dispatch(submitAddress({ formData, method, addressId }))
      .unwrap()
      .then(({ method }) => {
        showTailwindMessage(
          method === 'POST' ? 'آدرس جدید ایجاد شد' : 'آدرس با موفقیت بروز شد',
          method === 'POST' ? 'success' : 'info'
        );
        window.location.hash = 'address_section';
        window.location.reload();
      })
      .catch((error) => {
        showTailwindMessage(error, 'error');
      });
  };

  const handleEditAddress = (addressId) => {
    dispatch(editAddress(addressId))
      .unwrap()
      .catch((error) => {
        showTailwindMessage(error, 'error');
      });
  };

  return (
    <>
      <button
        onClick={openModal}
        id="openAddress"
        className="bg-orange-500 text-white px-4 py-2 rounded-lg IRANYekan"
      >
        افزودن آدرس جدید
      </button>
      <div
        id="addressModal"
        className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 transition-opacity duration-300 ${
          isModalOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={(e) => e.target.id === 'addressModal' && closeModal()}
      >
        <div
          className={`bg-white rounded-lg w-full max-w-md transform transition-transform duration-300 ${
            isModalOpen ? 'scale-100' : 'scale-95'
          }`}
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-200">
            <h2 className="font-bold text-lg IRANYekan">اضافه کردن آدرس جدید</h2>
            <button onClick={closeModal} className="text-gray-500 hover:text-black">
              &times;
            </button>
          </div>
          <form
            onSubmit={handleSubmit}
            className="p-4 space-y-4 text-sm max-h-[80vh] overflow-y-auto"
            dir="ltr"
            id="addressForm"
          >
            <div dir="rtl" className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-1 YekanBakh">استان</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                  className="YekanBakh w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">انتخاب استان</option>
                  {provinces?.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name}
                    </option>
                  ))}
                </select>
                {errors.province && <span className="text-red-500 text-xs">{errors.province}</span>}
              </div>
              <div>
                <label className="block mb-1 YekanBakh">شهر</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="YekanBakh w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
                >
                  <option value="">انتخاب شهر</option>
                  {cities.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
                {errors.city && <span className="text-red-500 text-xs">{errors.city}</span>}
              </div>
            </div>
            <div dir="rtl">
              <label className="block mb-1 YekanBakh">انتخاب موقعیت مکانی</label>
              <input type="hidden" name="address" value={formData.address} />
              <input type="hidden" name="latitude" value={formData.latitude} />
              <input type="hidden" name="longitude" value={formData.longitude} />
              <input type="hidden" name="neighbourhood" value={formData.neighbourhood} />
              <div className="relative select-none w-full h-48 rounded-lg overflow-hidden border border-gray-300">
                <div ref={mapRef} className="w-full h-full"></div>
                <img
                  src="https://cdn-icons-png.flaticon.com/512/684/684908.png"
                  alt="Pin"
                  className="absolute w-8 h-8 select-none pointer-events-none"
                  style={{ top: '50%', left: '50%', transform: 'translate(-50%, -100%)', zIndex: 500 }}
                />
              </div>
            </div>
            <div dir="rtl" className="flex flex-row justify-between gap-3">
              <button
                type="button"
                onClick={handleSelectLocation}
                className="IRANYekan py-3 w-[120px] cursor-pointer rounded-lg bg-orange-500 px-2 text-white"
              >
                تایید مکان
              </button>
              <input
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="IRANSansXFaNum border w-full border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
                type="text"
              />
              {errors.address && <span className="text-red-500 text-xs">{errors.address}</span>}
            </div>
            <div dir="rtl" className="grid grid-cols-2 gap-4">
              <input
                name="notes"
                value={formData.notes}
                onChange={handleInputChange}
                placeholder="نوشتن پلاک / واحد"
                className="border IRANSansXFaNum border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="postal_code"
                value={formData.postal_code}
                onChange={handleInputChange}
                placeholder="کد پستی"
                maxLength="10"
                pattern="^\d{0,10}$"
                title="کد پستی باید ۱۰ رقم و فقط شامل عدد باشد"
                className="border IRANSansXFaNum border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
              />
              {errors.postal_code && <span className="text-red-500 text-xs">{errors.postal_code}</span>}
            </div>
            <ul dir="rtl" className="text-gray-600 text-xs space-y-1">
              <li className="YekanBakh">فیلد کدپستی باید ۱۰ رقمی باشد و بدون فاصله نوشته شود.</li>
              <li className="YekanBakh">نشانی باید به صورت دقیق نوشته شود.</li>
              <li className="YekanBakh">پس از ثبت آدرس، امکان ویرایش یا حذف آن وجود ندارد。</li>
            </ul>
            <div dir="rtl">
              <h3 className="font-medium mb-2 border-b border-zinc-200 py-2 IRANYekan">گیرنده سفارش</h3>
              <label className="flex items-center gap-2 mb-2">
                <input
                  type="checkbox"
                  checked={isReceiverSelf}
                  onChange={() => dispatch(setReceiverSelf(!isReceiverSelf))}
                  className="w-4 h-4 text-orange-500 border-gray-300 rounded"
                />
                <span className="YekanBakh">گیرنده سفارش خودم هستم</span>
              </label>
              {!isReceiverSelf && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      name="receiver_first_name"
                      value={formData.receiver_first_name}
                      onChange={handleInputChange}
                      placeholder="نام"
                      className="YekanBakh border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
                    />
                    <input
                      name="receiver_last_name"
                      value={formData.receiver_last_name}
                      onChange={handleInputChange}
                      placeholder="نام خانوادگی"
                      className="YekanBakh border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500"
                    />
                  </div>
                  <input
                    name="receiver_phone"
                    value={formData.receiver_phone}
                    onChange={handleInputChange}
                    placeholder="شماره موبایل گیرنده"
                    className="IRANSansXFaNum text-[12px] font-light text-zinc-500 border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-orange-500 w-full"
                  />
                </div>
              )}
            </div>
            <div className="mt-5 flex flex-col gap-3">
              <button
                type="submit"
                className={`IRANYekan w-full py-3 rounded-lg text-white font-medium ${
                  method === 'POST' ? 'bg-orange-500 hover:bg-orange-600' : 'hidden'
                }`}
              >
                تایید آدرس
              </button>
              <button
                type="submit"
                className={`IRANYekan w-full py-3 rounded-lg text-white font-medium ${
                  method === 'PATCH' ? 'bg-blue-500 hover:bg-blue-600' : 'hidden'
                }`}
              >
                بروزرسانی آدرس
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default AddressModal;