import React from 'react'

import { Link } from 'react-router-dom';
import { Product } from '../types/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, Grid, Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/grid';
import ProductCard from './ProductCard';

const SectionSwiperBig = ({ category }: { category: Product[] }) => {

    return (
        <div className="goods-list-big goods-list">
            <Swiper
                modules={[Grid, Navigation, Scrollbar]}
                spaceBetween={24}
                slidesPerView={3}
                grid={{ rows: 2, fill: 'row' }}
                // allowTouchMove={category.length > 6}
                // navigation
                scrollbar={{ draggable: true }}
                grabCursor={true} // 마우스 커서가 손바닥 모양으로 변함
                allowTouchMove={true} // 드래그 가능하게
            >
                {category.map((item) => (
                    <SwiperSlide key={item.id}>
                        <div>
                            <Link to={`/products/${item.id}`}>
                                <ProductCard senditem={item} />
                            </Link>
                        </div>
                    </SwiperSlide>

                ))}
            </Swiper>

        </div>
    );
}
export default SectionSwiperBig