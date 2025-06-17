import React from 'react'
import Title from '../components/Title'
import { useCartStore } from '../store/useStore'
import "./scss/cart.scss";

const Cart = () => {
  const {
    cartItems,
    totalPrice,
    removeCart,
    increaseQuantity,
    decreaseQuantity
  } = useCartStore();
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
                    <div className='btn'>
                      <p className='amount-wrap'>
                        <button
                          onClick={() => decreaseQuantity(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() => increaseQuantity(item.id)}>+</button>
                      </p>
                      <button
                        onClick={() => removeCart(item.id)}>삭제</button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="cart-bottom">
            <p>총금액 : <span>$ {totalPrice}</span></p>
            <p className='btn'><button className='black-btn'>모두 구매하기</button></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
