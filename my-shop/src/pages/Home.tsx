import React from 'react'
import MainSwiper from '../components/MainSwiper'
import Title from '../components/Title'
import { useStore } from 'zustand'
import ProductCard from '../components/ProductCard'
import CategoryPage from '../components/CategoryPage'
import CategoryBigPage from '../components/CategoryBigPage'

const Home = () => {  
  return (
    <>
      <div className='container'>
        <MainSwiper />
        <div className='main'>
          <section className='content-inner'>
            <Title title="매일 새로운 아웃도어 신상으로 채우다"
             subTitle="새롭게 선보이는 탐험의 제품들을 만나보세요" />
            <CategoryPage categoryName=''/>
          </section>

          <section className='content-inner'>
            <Title title="화이트라벨로 가볍게 입는 여름" 
            subTitle="WHITE LABEL SUMMER COLLECTION" />
            <CategoryBigPage categoryName='' imgUrl='women'/>
          </section>

        </div>
        
      </div>
    </>

  )
}

export default Home
