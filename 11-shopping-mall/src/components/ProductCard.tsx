import React from 'react'
import { Product } from '../types/Product'; // 타입을 별도로 관리하는 경우

const ProductCard = ({ senditem }: { senditem: Product }) => {
  return (
    <div>
      <div className="img-box"><img src={senditem.image} alt={senditem.title} width={100} /></div>
      <div className='text-box'>
        <h3>{senditem.title}</h3>
        <div><span>30%</span><p>${senditem.price}</p></div>
      </div>
    </div>
  )
}

export default ProductCard