import React from 'react'
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const MainSwiper = () => {
    return (
        <div className='main-swiper'>
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                navigation
                autoplay={{delay:3000}}
                pagination={{ clickable: true }}
                loop={true}>
                <SwiperSlide>
                    <img src="./images/main_slider_01.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/main_slider_02.jpg" alt="" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/main_slider_03.jpg" alt="" />
                </SwiperSlide>
            </Swiper>
        </div>
    )
}

export default MainSwiper
