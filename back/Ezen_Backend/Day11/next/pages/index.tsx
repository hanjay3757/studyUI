import Image from 'next/image';
import localFont from 'next/font/local';
import React from 'react';
import ProductList from './products/ProductList';

const dummyProducts = [
  {
    id: 1,
    name: 'T-shirt',
    price: 35000,
    image_name: 'tshirt_m1.jpg',
    sec: 'best',
  },
  {
    id: 2,
    name: 'Jeans',
    price: 45000,
    image_name: 'jeans_m1.jpg',
    sec: 'sale',
  },
  // 추가적인 상품들도 여기에 객체 형태로 추가 가능
];
// 동적
// page/cart/[uid]
// 비동적
export default function Home() {
  return (
    <div style={{ padding: '2rem' }}>
      <div>
        <h1>home</h1>
        <ProductList products={dummyProducts} title="All" />
      </div>
    </div>
  );
}
