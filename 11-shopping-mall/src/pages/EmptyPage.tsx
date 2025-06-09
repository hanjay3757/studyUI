import React from 'react'
import { useNavigate } from 'react-router-dom'

const EmptyPage = () => {
  const navigate = useNavigate();
  return (
    <div className="container" >
      <div className='content-inner main'>
        <div className='titleBox'>
          <p><img src="./images/cart.png" alt="" /></p>
          <h2 className='title'>장바구니에 담긴 상품이 없습니다.</h2>
          <p>온라인 스토어의 다양한 상품을 검색해 보세요..</p>

        </div>
        <div>
          <button className='white-btn' onClick={() => navigate("/")}>상품보러가기</button>
        </div>
      </div >
    </div >
  )
}

export default EmptyPage