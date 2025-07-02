// pages/cart/[id].tsx
// import { useRouter } from 'next/router';
// export default function CartPage() {
//   const router = useRouter();
//   const { id } = router.query;
// //   useRouter()	Next.js의 라우터 훅 (라우팅 정보 접근)

//   return (
//     <div style={{ padding: '2rem' }}>
//       <h1>{id}님의 장바구니</h1>
//       {/* 장바구니 목록을 불러오는 컴포넌트나 fetch 코드 등 */}
//     </div>
//   );
// }
import { useRouter } from 'next/router';
import { useCartStore } from '@/stores/cartStore';
import { useEffect } from 'react';
import styles from './CartPage.module.css'
import { BsCart4 } from "react-icons/bs";
import { FcEmptyTrash } from "react-icons/fc";
import Link from 'next/link';
export default function CartPageByUser() {
  const router = useRouter();
  const { id } = router.query;//회원 아이디

  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  //장바구니 총액 구하기: (가격 * 수량)을 누적
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  useEffect(() => {
    if (!id) return;
    console.log('현재 user_id:', id);
    // 실제 로그인 기능 추가 시 id와 비교하여 인증 가능
  }, [id]);

  return (
    <div  className={styles.cartList}>
      <h1><BsCart4/> {id} 님의 장바구니</h1>

      {items.length === 0 ? (
        <p>장바구니가 비어 있습니다.</p>
      ) : (
        <>
          <table className={styles.cartTable}>
            <thead>
              <tr>
                <th style={{textAlign: 'left' }}>상품</th>
                <th>수량</th>
                <th>가격</th>
                <th>소계</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Link href={`/products/${item.id}`}><img
                      src={item.image_url}
                      alt={item.name}
                      style={{ width: '150px', marginRight: '0.5rem', verticalAlign: 'middle' }}
                    /></Link>
                    {item.name}
                  </td>
                  <td align="center">{item.quantity}</td>
                  <td align="center">{item.price.toLocaleString()}원</td>
                  <td align="center">
                    {(item.price * item.quantity).toLocaleString()}원
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ marginTop: '1rem', fontWeight: 'bold' }}>
            총 합계: {total.toLocaleString()}원
          </div>

          <div style={{ marginTop: '1rem' }}>
            <button onClick={clearCart} style={{ marginRight: '1rem' }}>
              <FcEmptyTrash/>장바구니 비우기
            </button>
            <button onClick={() => router.push('/')}>← 계속 쇼핑</button>
          </div>
        </>
      )}
    </div>
  );
}
/** DB 이용시 장바구니 테이블 (cart_items) ddl문장
 * CREATE TABLE cart_items (
  id INT AUTO_INCREMENT PRIMARY KEY, -- 장바구니 번호
  user_id INT NOT NULL, -- 로그인한 회원아이디(이메일)
  product_id INT NOT NULL, -- 상품번호
  quantity INT NOT NULL DEFAULT 1, -- 장바구니 담은 상품수량
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- 담은 날짜
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 수정일
  UNIQUE KEY unique_cart (user_id, product_id) -- 회원아이디+상품번호 합해 unique제약조건을 주자
);
 * 
 */