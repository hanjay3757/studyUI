import { Product } from '@/types/Products';
import React from 'react';
import Productcard from './Productcard';
import styles from './ProductList.module.css';
interface ProductListProps {
  products: Product[];
  title?: string;
}

export default function ProductList({ products, title }: ProductListProps) {
  return (
    <div className={styles.container}>
      {title && <h2>{title}</h2>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((prod) => (
          <Productcard key={prod.id} {...prod} />
        ))}
      </div>
    </div>
  );
}
