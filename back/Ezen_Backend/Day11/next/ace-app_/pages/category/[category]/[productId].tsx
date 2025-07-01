import React from 'react'
import { useRouter } from 'next/router'
//다중 동적 라우팅
// /category/Clothes/100, /category/Elec/200
export default function ProductDetail() {
  const {category, productId}= useRouter().query;

  return (
    <div>
      <h1>카테고리명: {category}</h1>
      <h1>상품 ID : {productId}</h1>
    </div>
  )
}
