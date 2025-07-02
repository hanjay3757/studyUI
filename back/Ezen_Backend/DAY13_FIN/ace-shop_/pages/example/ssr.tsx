import { GetServerSideProps } from 'next';

interface SSRExampleProps {
  serverTime: string;
}

export default function SSRExample({ serverTime }: SSRExampleProps) {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>서버 사이드 렌더링 예제</h1>
      <p>서버에서 렌더링된 현재 시간: {serverTime}</p>
    </div>
  );
}

// 서버에서 매 요청마다 호출되는 함수
export const getServerSideProps: GetServerSideProps = async () => {
  const serverTime = new Date().toLocaleString();

  return {
    props: {
      serverTime,
    },
  };
};
/**
 * getServerSideProps 함수가 매 요청마다 서버에서 실행되어 데이터를 가져옵니다.
여기서는 serverTime이라는 현재 시간을 문자열로 만들어서 넘깁니다.
페이지 컴포넌트는 이 serverTime을 받아 렌더링합니다.
브라우저에선 이미 렌더링된 HTML을 받으므로 SEO와 초기 로딩 속도가 좋습니다.
 */