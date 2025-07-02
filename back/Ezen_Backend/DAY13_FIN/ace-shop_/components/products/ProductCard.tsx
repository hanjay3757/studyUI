import styles from './ProductCard.module.css';
import Link from 'next/link';
interface ProductCardProps {
    id:number;
  name: string;
  price: number;
  image_url: string;
  spec?:string;
}

export default function ProductCard({id, name, price, image_url }: ProductCardProps) {
  return (
    <Link href={`/products/${id}`} className={styles.card}>
      <img src={image_url} alt={name} className={styles.image} />
      <div className={styles.name}>{name}</div>
      <div className={styles.price}>{price.toLocaleString()}원</div>
    </Link>
  );
}
