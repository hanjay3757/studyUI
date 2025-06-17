import React from 'react'

import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import ProductCard from './ProductCard';


const SectionSwiper = ({ category }: { category: Product[] }) => {

    return (
        <div className="goods-list">
            <Swiper
                modules={[Autoplay, Pagination, Navigation]}
                spaceBetween={24} // 슬라이더 간의 간격 지정
                slidesPerView={4}
            >
                {category.map((item) => (
                    <SwiperSlide key={item.id}>
                        <Link to={`/products/${item.id}`}>
                      
                            <ProductCard senditem={item} />
                            
                        </Link>
                    </SwiperSlide>
                ))}
            </Swiper>
            
        </div>
    );
}
export default SectionSwiper