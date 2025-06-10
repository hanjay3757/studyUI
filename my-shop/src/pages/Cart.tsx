import React from 'react'
import Title from '../components/Title'
import { useCartStore } from '../store/useStore'
import "./scss/cart.scss";

const Cart = () => {
  const { cartItems } = useCartStore();
  // const { cartCount } = useCartStore();

  return (
    <div className='container'>
      <div className="content-inner">
        <Title title="장바구니" />
        <div className="cart-wrap">
          <div className="cart-title">
            <div className='cart-left'>
              <span>제품이미지</span>
              <span>제품명</span>
            </div>
            <div className='cart-right'>
              <p>가격</p>
              <p>옵션</p>
            </div>
          </div>
          <div className="cart-list-wrap">
            <ul>
              {cartItems.map((item) => (
                <li>
                  <div className="cart-left">
                    <span><img src={item.image} alt="" /></span>
                    <span>{item.title}</span>
                  </div>
                  <div className="cart-right">
                    <p>{item.price}</p>
                    <p className='btn'>
                      <button>옵션변경</button>
                      <button>삭제</button>
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
