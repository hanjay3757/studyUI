import { useRouter } from 'next/router';
// /category/electronics/123 다중 동적 라우팅
export default function ProductDetail() {
  const { category, productId } = useRouter().query;

  return (
    <div>
      <h1>카테고리: {category}</h1>
      <h1>상품 ID: {productId}</h1>
    </div>
  );
} 
