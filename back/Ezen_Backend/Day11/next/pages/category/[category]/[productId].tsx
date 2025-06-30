import { useRouter } from 'next/router';
import React from 'react';
// http://localhost:3000/category/cat/100
export default function productDetail() {
  const { category, productId } = useRouter().query;
  return (
    <div>
      <h1>category: {category}</h1>
      <h1>productId: {productId}</h1>
    </div>
  );
}
