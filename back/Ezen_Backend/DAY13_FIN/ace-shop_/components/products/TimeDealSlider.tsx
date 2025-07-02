import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './TimeDealSlider.module.css';
import { useState, useEffect } from 'react';
import { Autoplay, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
// import { TimeDeal } from '@/types/TimeDeal'; // 이걸로 가져오면 타입이 맞지 않음. 이것은 관리자페이지에서 사용함
import { TimeDeal } from '@/pages';
import Link from 'next/link';

// interface TimeDeal {
//   id: number;
//   name: string;
//   price:number;
//   deal_price: number;
//   image_url: string;
//   start_time:string;
//   end_time: string;
// }

interface Props {
  deals: TimeDeal[];
  title?: string;
}

function Countdown({ endTime }: { endTime: string }) {
  const [timeLeft, setTimeLeft] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const end = new Date(endTime);
      const diff = end.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft('⏰ 종료됨');
        clearInterval(interval);
      } else {
        const hours = Math.floor(diff/(60*60*1000))
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)); // 분
        //분 단위는 diff에서 시간 단위를 뺀 나머지를 1분(60000ms)으로 나눈 값이어야 함
        const seconds = Math.floor((diff % 60000) / 1000);
        setTimeLeft(`${hours}시 ${minutes}분 ${seconds}초 남음`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [endTime]);

  return <div className={styles.timer}>{timeLeft}</div>;
}

export default function TimeDealSlider({ deals, title }: Props) {
  return (
    <div className={styles.container}>
      <h2>⏰ {title || '타임딜 진행중!'}</h2>
      <Swiper slidesPerView={1} spaceBetween={20} loop modules={[Autoplay]}
  autoplay={{ delay: 4000 }}  >
        {deals.map((deal, i) => {
          const discount = Math.round(((deal.price - deal.deal_price) / deal.price) * 100);
          return (
            <SwiperSlide key={deal.id}>
              <div className={styles.slide}>
                <div className={styles.card}>
                 <Link href={`/products/${deal.id}`}><img src={deal.image_url} alt={deal.name} className={styles.image} /></Link> 
                  <div className={styles.info}>
                    <h3>{deal.name}</h3>
                    <p>
                      <del>{deal.price.toLocaleString()}원</del>{' '}
                      <strong>{deal.deal_price.toLocaleString()}원</strong>
                    </p>
                    <Countdown endTime={deal.end_time} />
                  </div>
                </div>
                {/* <div className={`${styles.discountBox} ${styles.box1}`}> */}
                 <div className={`${styles.discountBox} ${styles[`box${(i + 1)%2}`]}`}>
                    <h2>Time Deal</h2>
                  {discount}%<br />할인
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
