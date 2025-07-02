import ProductCard from './ProductCard';
import styles from './ProductList.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image_url: string;
}

interface ProductListProps {
  products: Product[];
  title?: string;
}

export default function ProductList({ products, title }: ProductListProps) {
  return (
    <div className={styles.container}>
      {title && <h2 className={styles.title}>{title}</h2>}
      <div className={styles.row}>
        {products.map((product) => (
          <ProductCard key={product.id}
          {...product}
          
          />
        ))}
      </div>
    </div>
  );
}
