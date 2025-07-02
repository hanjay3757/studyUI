import { useState } from 'react';
import styles from './ProductDetail.module.css';
import type { Product } from '@/types/Product';
import { useRouter } from 'next/router';
import { useCartStore } from '@/stores/cartStore';


export default function ProductDetail({ product }: { product: Product }) {

  const router = useRouter();

  const [quantity, setQuantity] = useState(1);
  const isOnDeal = product.deal_price && product.deal_price < product.price;
  const discount = isOnDeal
    ? Math.round(((product.price - product.deal_price!) / product.price) * 100)
    : 0;
   const addToCart = useCartStore((state) => state.addToCart);

  const goAddToCart = () => {
    addToCart({ ...product, quantity });
    alert('장바구니에 담았습니다!');
    router.push('/cart/hong')
  }; 

  const goShopping=()=>{
    if (window.history.length > 1) {
      router.back(); //history.back()과 유사
    } else {
      router.push('/'); // 홈 또는 목록으로 이동
    }
  }  
  return (
    <div className={styles.wrapper}>
      <div className={styles.imageBox}>
        <img src={product.image_url} alt={product.name} />
      </div>

      <div className={styles.infoBox}>
        <h2 className={styles.title}>{product.name}</h2>
        
        <div className={styles.priceBox}>
          {isOnDeal ? (
            <>
              <span className={styles.dealPrice}>
                {product.deal_price?.toLocaleString()}원
              </span>
              <span className={styles.originalPrice}>
                <del>{product.price.toLocaleString()}원</del>
              </span>
              <span className={styles.discount}>-{discount}%</span>
            </>
          ) : (
            <span className={styles.normalPrice}>
              {product.price.toLocaleString()}원
            </span>
          )}
        </div>

        <p className={styles.description}>[No: {product.id}]<br/>{product.description}</p>

        <div className={styles.options}>
          <label>
            수량:
            <input
              type="number"
              value={quantity}
              min={1}
              onChange={(e) => setQuantity(Number(e.target.value))}
            />
          </label>
        </div>

        <div className={styles.buttonGroup}>
          <button className={styles.cartBtn} onClick={goAddToCart}>장바구니</button>
          <button className={styles.buyBtn}>구매하기</button>
          <button className={styles.backBtn} onClick={goShopping}>계속 쇼핑</button>
        </div>
      </div>
    </div>
  );
}
