import { useRouter } from 'next/router';
// /search/노트북/삼성 같은 경로를 처리하는 catch-all 라우팅 예제인 pages/search/[...keywords].tsx 
// /search/notebook/apple/mac/lg
/**
 * pages/search/[...keywords].tsx 설명
이 라우트는 /search/a, /search/a/b, /search/a/b/c 같은 1개 이상 세그먼트가 있을 때만 매치됩니다.

하지만 /search는 세그먼트가 없음 → 매치되지 않음 → 404 발생
 * [...keywords].tsx → [[...keywords]].tsx로 변경
대괄호 두 개([[...keywords]])를 사용하면
선택적(catch-all optional) 라우트가 되어 /search 자체도 매치됩니다 
잘 안될땐 .next를 지우고 재시작 해보자
*/
export default function SearchPage() {
  const router = useRouter();
  const { keywords } = router.query;

  // keywords는 string[] 또는 undefined일 수 있습니다.
  if (!keywords) {
    return <p>검색어가 없습니다.</p>;
  }

  return (
    <div style={{ padding: '2rem' }}>
      <h1>검색 결과</h1>
      <p>검색 키워드:</p>
      <ul>
        {Array.isArray(keywords) ? (
          keywords.map((word, idx) => <li key={idx}>{word}</li>)
        ) : (
          <li>{keywords}</li> // 만약 단일 문자열일 경우
        )}
      </ul>
    </div>
  );
}
