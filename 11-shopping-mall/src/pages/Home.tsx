
import React, { useState, useEffect } from "react";

import MainSwiper from "../components/MainSwiper";
import Title from "../components/Title";
import SectionSwiperBig from "../components/SectionSwiperBig";
import CategoryPage from "../components/CategoryPage";
import { useCartStore } from "../store/useCartStore";

const Home = () => {
  const { items, fetchItems } = useCartStore();

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items.length]);

  return (
    <div className='home-wrap'>
      <MainSwiper />
      <div className='container'>
        <div className='goods-list-wrap section'>
          <CategoryPage
            title="액티비티와 가까워지는 계절"
            subTitle="러닝부터 하이킹까지 최상의 퍼포먼스를 위한 아웃도어 컬렉션"
            imgUrl=""
            categoryName="" />
        </div>

        <div className='goods-list-wrap content-inner section'>
          {/* <ProductList /> */}
          <Title title="화이트라벨로 가볍게 입는 여름" subTitle="WHITE LABEL SUMMER COLLECTION" />
          <div className="goods-list-big-wrap">
            <div className="big-img"><img src="./images/women-big.jpg" alt="" /></div>
            <div className="big-right"><SectionSwiperBig category={items} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home