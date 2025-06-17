import React from 'react'
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { Product } from '../types/ProductType'
import { Autoplay, Navigation, Grid, Scrollbar } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation"
import "swiper/css/grid"
import "swiper/css/scrollbar"


const SectionBigSwiper = ({ category }: { category: Product[] }) => {
    return (
        <div className='goods-list'>
            <Swiper
                modules={[Grid, Autoplay, Navigation, Scrollbar]}
                slidesPerView={3}
                spaceBetween={24}
                grid={{ rows: 2, fill: "row" }}
                scrollbar={{ draggable: true }}
            >
                {category.map((item) => (
                    <SwiperSlide>
                        <Link to={`/products/${item.id}`}>
                            <ProductCard sendItem={item} />
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}

export default SectionBigSwiper
