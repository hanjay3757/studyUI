import React from 'react'
import MainSwiper from '../components/MainSwiper'
import Title from '../components/Title'

const Home = () => {
  return (
    <>
      <div className='container'>
        <MainSwiper />
        <div className='main'>
          <section>
            <Title title="매일 새로운 아웃도어 신상으로 채우다"
             subTitle="새롭게 선보이는 탐험의 제품들을 만나보세요" />
             
          </section>
        </div>
        
      </div>
    </>

  )
}

export default Home
