import React from 'react'
import { Product } from '../types/ProductType'
import { Autoplay, Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import "swiper/css";
import "swiper/css/navigation"
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';

const SectionSwiper = ({ category }: { category: Product[] }) => {
  return (
    <div className='goods-list'>
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={4}
        spaceBetween={24}
        navigation
        >
        {category.map((item) => (
          <SwiperSlide>
            <Link to={`/products/${item.id}`}>
              <ProductCard sendItem={item}/>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}

export default SectionSwiper
