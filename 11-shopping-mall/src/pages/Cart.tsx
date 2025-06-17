// src/pages/Cart.tsx
import React from 'react';
import { useCartStore } from '../store/useCartStore';
import Title from '../components/Title';
import "./cart.scss"
import EmptyPage from './EmptyPage';

const Cart = () => {
    const cartItems = useCartStore((state) => state.cartItems);
    const totalPrice = useCartStore((state) => state.totalPrice);
    const removeFromCart = useCartStore((state) => state.removeFromCart);

    if (cartItems.length === 0) return (
        <EmptyPage />
    )

    return (
        <div className="container">
            <div className='content-inner'>
                <Title title="장바구니" />
                <div className="cart-wrap">
                    <div className="cart-title">
                        <div className='cart-left'>
                            <p>상품 정보</p>
                        </div>
                        <div className='cart-right'>
                            <p>주문금액</p>
                            <p>수량</p>
                        </div>
                    </div>
                    <ul className='cart-list'>
                        {cartItems.map((item) => (
                            <li key={item.id}>
                                <div className='cart-left'>
                                    <span><img src={item.image} alt={item.title} width={50} /></span>
                                    <span> {item.title}</span>
                                </div>
                                <div className='cart-right'>
                                    <p> ${item.price}</p>
                                    <p>
                                        <button className="white-btn" onClick={() => removeFromCart(item.id)}>옵션변경</button>
                                        <button className="black-btn" onClick={() => removeFromCart(item.id)}>삭제</button>
                                    </p>
                                </div>
                            </li>
                        ))}
                    </ul>
                    <div className='cart-bottom'>
                        <button>총금액 : ${totalPrice}</button>
                        <button className='black-btn'>모두 구매하기</button></div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
