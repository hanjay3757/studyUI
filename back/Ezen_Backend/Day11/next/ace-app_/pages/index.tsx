import Head from 'next/head';
import Image from 'next/image';
import localFont from 'next/font/local';
import styles from '@/styles/Home.module.css';
import type { Product } from '@/types/Product';
import type { TimeDeal } from '@/types/TimeDeal';
import ProductList from '@/components/products/ProductList';

interface Props {
  bestProducts: Product[];
  hitProducts: Product[];
  timeDeals: TimeDeal[];
}

// SSG 빌드 타입에 사전 렌더링  정적인 페이지를 구성할떄 쓰는거 getStaticProps()
// SSR 요청이 있을때만 사전 렌더링 동적인 페이지 구성할떄 사용 getServersideProps()
const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
//동적 라우팅 /pages/cart/[uid].tsx ==
export default function Home({bestProducts,hitProducts,timeDeals}:props) {
  return (
    <>
      <div className={styles.container}>
        <h1>Home</h1>
        <p>Best상품 Hit상품 타임딜 상품 진열할 예정</p>
<div className='p-1'>
<ProductList products = {bestProducts} title='🍳BEST'/>
</div>
<div className='p-1'>
<ProductList products = {hitProducts} title='💥HIT'/>
</div>

      </div>
    </>
  );
}

export async function getStaticProps() {
  try {
    let url1 = `http://localhost:7777/api/products/spec`;
    let url2 = `http://localhost:7777/api/timeDeals`;
    const bestProducts = await fetch(url1 + `?spec=best`);
    const hitProducts = await fetch(url1 + `?spec=hit`);
    const timeDeals = await fetch(url2);
    return {
      props: {
        bestProducts,
        hitProducts,
        timeDeals,
      },
    };
  } catch (error) {
    console.error('error', error);
    return {
      props: {
        bestProduct:Product[],
        hitProducts:Product[],     
          timeDeals:Product[],
              },
    };
  }
}
