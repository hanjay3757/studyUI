import React from 'react';
import { Product } from '@/types/Products';

interface ProductcardProps extends Product {
  // Product 타입에 포함된 모든 필드를 받음
}

const Productcard = ({
  id,
  name,
  price,
  image_url,
  spec,
}: ProductcardProps) => {
  return (
    <div className="border p-4 rounded-lg">
      <img src={image_url} alt={name} className="w-full h-auto" />
      <h3>{name}</h3>
      <p>{price} 원</p>
      <p>Section: {spec}</p>
    </div>
  );
};

export default Productcard;
