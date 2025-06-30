// pages/index.tsx

import React from 'react';
import ProductList from './ProductList';

export default function Home({ products }: { products: any[] }) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Home</h1>
      <ProductList products={products} title="All" />
    </div>
  );
}

// 서버 사이드에서 데이터를 가져오는 함수
export async function getServerSideProps() {
  try {
    const url = 'http://localhost:3000/api/products'; // API 호출
    const response = await fetch(url);
    const data = await response.json();

    // API 응답 데이터에 image_url을 포함시키는 예시
    const products = data.products.map((product: any) => ({
      ...product,
      image_url: `/images/${product.image_name}`, // public 폴더 내의 경로를 추가
    }));

    return {
      props: {
        products, // 제품 리스트와 함께 props로 전달
      },
    };
  } catch (error) {
    console.error(error);
    return {
      props: {
        products: [],
      },
    };
  }
}
