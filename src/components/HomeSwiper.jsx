import React from 'react';
// Import Swiper React components  
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles  
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// Import required modules  
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default function App() {
  return (
    <div className='flex flex-row-reverse items-center px-6 align-element '>
      <div className='lg:flex flex-col gap-4 hidden ms-5'>
        <img className='h-[10.8rem] w-[12rem] rounded-2xl' src="https://picsum.photos/1200/500" alt="" />
        <img className='h-[10.8rem] w-[12rem] rounded-2xl' src="https://picsum.photos/1200/500" alt="" />
      </div>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        grabCursor={true}
        loop={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-[360px] my-5 " // Tailwind for .swiper  
      >
        <SwiperSlide className="flex rounded-lg items-center justify-center  bg-white">
          <img className=" rounded-3xl w-full h-full" src="https://picsum.photos/1200/500" alt="" />
        </SwiperSlide>
        <SwiperSlide className="flex rounded-lg items-center justify-center  bg-white">
          <img className=" rounded-3xl w-full h-full" src="https://picsum.photos/1200/500" alt="" />
        </SwiperSlide>

      </Swiper>
    </div>
  );
}