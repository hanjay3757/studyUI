// 예: src/pages/index.tsx
import styles from '../styles/Home.module.css';
import ProductList from '@/components/products/ProductList';
import TimeDealSlider from '@/components/products/TimeDealSlider';
import type { Product } from '@/types/Product';
// import type { TimeDeal } from '@/types/TimeDeal';
// interface Product {
//   id: number;
//   name: string;
//   price: number;
//   image_url: string;
// }

export interface TimeDeal {
  id: number;
  name: string;
  price:number;
  deal_price: number;
  image_url: string;
  start_time:string;
  end_time: string;
}

interface Props {
  bestProducts: Product[];
  hitProducts: Product[];
  timeDeals: TimeDeal[];
}

export default function Home({ bestProducts, hitProducts, timeDeals }: Props) {
  return (
    <div className={styles.container}>
      <TimeDealSlider deals={timeDeals} title="⏰ 지금 진행 중인 타임딜" />
      <div style={{ padding: '1rem' }}>
        <ProductList products={bestProducts} title="🌟 Best 상품" />
      </div>
      <div style={{ padding: '1rem' }}>
        <ProductList products={hitProducts} title="🔥 HIT 상품" />
      </div>
    </div>
  );
}

// SSG
// pages/index.tsx
export async function getStaticProps() {
  const bestRes = await fetch('http://localhost:7777/api/products/spec?spec=best');
  const hitRes = await fetch('http://localhost:7777/api/products/spec?spec=hit');
  const timeDealRes = await fetch('http://localhost:7777/api/timeDeals'); // 예시

  const bestProducts = await bestRes.json();
  const hitProducts = await hitRes.json();
  let timeDeals =await timeDealRes.json();
  console.log('timeDeals ****', timeDeals);
  
  // if(!timeDeals){
  //   timeDeals =dummyTimeDeals;
  // }

  return {
    props: {
      bestProducts,
      hitProducts,
      timeDeals,
    },
    revalidate: 60   // ISR: 1분마다 갱신
  };
}
