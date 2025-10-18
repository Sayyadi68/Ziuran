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
  fetchProvinces,
  submitAddress,
} from '../redux/addressSlice';

const AddressModal = () => {
  const dispatch = useDispatch();
  const { isModalOpen, formData, isReceiverSelf, method, addressId, errors, cities, provinces } = useSelector(
    (state) => state.address
  );

  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const initialLat = 35.6892;
  const initialLng = 51.3890;

  useEffect(() => {
    if (isModalOpen) {
      dispatch(fetchProvinces());
      setTimeout(() => initMap(initialLat, initialLng), 500);
    }
  }, [isModalOpen, dispatch]);

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
      const safePanBy = (dx, dy) => map?.panBy([dx, dy], { animate: false });

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

  const openModal = () => dispatch(setModalOpen(true));
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
    if (provinceId) dispatch(fetchCities(provinceId));
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
      if (!formData[key]?.toString().trim()) newErrors[key] = `${name} الزامی است`;
    });

    if (formData.postal_code && !/^\d{5,10}$/.test(formData.postal_code)) {
      newErrors.postal_code = 'کد پستی باید بین ۵ تا ۱۰ رقم عددی باشد';
    }

    if (Object.keys(newErrors).length > 0) {
      dispatch(setErrors(newErrors));
      return;
    }

    dispatch(submitAddress({ formData, method, addressId }));
  };

  return (
    <>
      <button
        onClick={openModal}
        className="px-4 py-2 rounded-lg font-medium text-white bg-[#7B2C3F] IRANYekan"
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
        <div className={`rounded-lg w-full max-w-md transform transition-transform duration-300 ${
          isModalOpen ? 'scale-100' : 'scale-95'
        } bg-[#272727] p-4`}> 

          <div className="flex items-center justify-between border-b border-[#3a3a3a] pb-3 mb-4">
            <h2 className="text-[#C5A253] font-bold IRANYekan text-lg">
              {method === 'POST' ? 'اضافه کردن آدرس جدید' : 'ویرایش آدرس'}
            </h2>
            <button onClick={closeModal} className="text-[#bfbfbf] text-2xl">&times;</button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="grid grid-cols-2 gap-4" dir="rtl">
              <div>
                <label className="block mb-1 text-[#C5A253] YekanBakh">استان</label>
                <select
                  name="province"
                  value={formData.province}
                  onChange={handleProvinceChange}
                  className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]"
                >
                  <option value="">انتخاب استان</option>
                  {provinces.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
                </select>
                {errors.province && <span className="text-xs text-[#7B2C3F]">{errors.province}</span>}
              </div>

              <div>
                <label className="block mb-1 text-[#C5A253] YekanBakh">شهر</label>
                <select
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]"
                >
                  <option value="">انتخاب شهر</option>
                  {cities.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                {errors.city && <span className="text-xs text-[#7B2C3F]">{errors.city}</span>}
              </div>
            </div>

            {/* Map */}
            <div dir="rtl">
              <label className="block mb-1 text-[#C5A253]">انتخاب موقعیت مکانی</label>
              <div className="relative w-full h-48 rounded-lg overflow-hidden border border-[#bfbfbf]">
                <div ref={mapRef} className="w-full h-full"></div>
                <img src="https://cdn-icons-png.flaticon.com/512/684/684908.png" alt="Pin" className="absolute w-8 h-8 pointer-events-none" style={{top:'50%', left:'50%', transform:'translate(-50%, -100%)', zIndex:500}} />
              </div>
              <button type="button" onClick={handleSelectLocation} className="mt-2 py-2 px-3 rounded-lg bg-[#7B2C3F] text-white">تایید موقعیت</button>
              {formData.address && <p className="text-xs text-[#bfbfbf] mt-1">{formData.address}</p>}
            </div>

            {/* Other fields */}
            <div className="grid grid-cols-2 gap-4" dir="rtl">
              <input name="notes" value={formData.notes} onChange={handleInputChange} placeholder="پلاک / واحد" className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]" />
              <input name="postal_code" value={formData.postal_code} onChange={handleInputChange} placeholder="کد پستی" maxLength="10" pattern="^[0-9]*$" title="کد پستی فقط عددی باشد" className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]" />
              {errors.postal_code && <span className="text-xs text-[#7B2C3F]">{errors.postal_code}</span>}
            </div>

            {/* Receiver */}
            <div dir="rtl">
              <h3 className="font-medium mb-2 border-b border-[#3a3a3a] pb-2 text-[#C5A253]">گیرنده سفارش</h3>
              <label className="flex items-center gap-2 mb-2">
                <input type="checkbox" checked={isReceiverSelf} onChange={() => dispatch(setReceiverSelf(!isReceiverSelf))} className="w-4 h-4 rounded border border-[#bfbfbf]" />
                <span className="text-white YekanBakh">گیرنده سفارش خودم هستم</span>
              </label>

              {!isReceiverSelf && (
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <input name="receiver_first_name" value={formData.receiver_first_name} onChange={handleInputChange} placeholder="نام" className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]" />
                    <input name="receiver_last_name" value={formData.receiver_last_name} onChange={handleInputChange} placeholder="نام خانوادگی" className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf]" />
                  </div>
                  <input name="receiver_phone" value={formData.receiver_phone} onChange={handleInputChange} placeholder="شماره موبایل گیرنده" className="w-full p-2 rounded-lg bg-[#3a3a3a] text-white border border-[#bfbfbf] text-[12px] IRANSansXFaNum" />
                </div>
              )}
            </div>

            <div className="mt-5">
              <button type="submit" className="w-full py-3 rounded-lg font-medium text-white bg-[#7B2C3F] IRANYekan">
                {method === 'POST' ? 'تایید آدرس' : 'بروزرسانی آدرس'}
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
};

export default AddressModal;