import React from "react";
import { Product } from "../types/ProductType";
import { Autoplay, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";
import {sendItem}
const SectionSwiper = ({ category }: { category: Product[] }) => {
  return (
    <div className="goods-list">
      <Swiper modules={[Autoplay, Navigation]}>
        {category.map((item) => (
          <SwiperSlide key={item.id}>
            <Link to={`/products/${item.id}`}>
              <ProductCard sendItem={item} />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default SectionSwiper;
