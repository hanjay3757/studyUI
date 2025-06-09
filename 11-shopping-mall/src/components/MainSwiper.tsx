import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MainSwiper = () => {
    return (
        <div className="main-swiper">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                autoplay={{ delay: 3000 }}
                pagination={{ clickable: true }}
                navigation
                loop={true}
            >
                <SwiperSlide>
                    <img src="./images/main_slider_01.jpg" alt="slide1" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/main_slider_02.jpg" alt="slide2" />
                </SwiperSlide>
                <SwiperSlide>
                    <img src="./images/main_slider_03.jpg" alt="slide3" />
                </SwiperSlide>
            </Swiper>
        </div>
    );
}

export default MainSwiper;