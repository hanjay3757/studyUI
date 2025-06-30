import React from 'react';
import { useRouter } from 'next/router';
// ChatGPT의 말:
// [[...keywords]].tsx는 Next.js의 동적 라우팅에서 사용되는 **"선택 연산자"**와는 관련이 없습니다. 이것은 **"동적 경로 파라미터"**와 관련된 Next.js의 파일 시스템 기반 라우팅 방식입니다. 다만, 이 코드에서의 사용법을 정확히 이해하기 위해서는 **[...param]**의 의미를 살펴보는 것이 중요합니다.

// [[...keywords]].tsx의 의미
// Next.js 동적 라우팅에서 [...] 구문은 동적 파라미터를 의미합니다. 예를 들어, /search/[category]와 같은 경로는 category를 동적으로 받아옵니다.

// **[[...param]]**은 옵셔널 파라미터를 처리하는 방법입니다. 이때:

// [...]는 하나 이상의 값을 받을 수 있다는 의미입니다 (예: /search/notebook/apple/mac).

// [[...param]]에서 대괄호가 두 개로 감싸져 있으면, 이 파라미터가 선택적임을 의미합니다. 즉, 해당 URL 경로가 반드시 있을 필요는 없고, 생략할 수도 있습니다.

// 예시
// 1. [[...keywords]].tsx
// 이 경로는 /search/notebook/apple/mac과 같은 여러 키워드를 받을 수 있습니다.

// 또한, 경로가 /search만 있을 경우에도 해당 컴포넌트가 렌더링될 수 있습니다.

// 예시 경로:

// /search/notebook/apple/mac → keywords는 ["notebook", "apple", "mac"]

// /search → keywords는 undefined 또는 빈 배열 [] (선택적 파라미터)

// 2. [...]와 [[...]]의 차이점
// [...param].tsx: 이 경로는 하나 이상의 파라미터를 받아들일 수 있습니다. 예를 들어, /search/notebook/apple/mac은 ["notebook", "apple", "mac"]로 처리됩니다.

// [[...param]].tsx: 이 경로는 선택적입니다. 즉, 파라미터가 없을 수도 있습니다. /search만 있어도 해당 페이지가 렌더링될 수 있습니다.

// 예시 코드
export default function SearchPage() {
  const router = useRouter();
  const { keywords } = router.query; // 'keywords'는 String[] 또는 undefined일 수 있음

  // 'keywords'가 없으면 "검색어 없다" 메시지 출력
  if (!keywords) {
    return <h3>검색어 없다</h3>;
  }

  return (
    <div>
      <h1>검색결과</h1>
      <h3>검색키워드</h3>
      <ul>
        {/* keywords가 배열일 경우 각각 출력 */}
        {Array.isArray(keywords) ? (
          keywords.map((word, i) => <li key={i}>{word}</li>)
        ) : (
          // keywords가 단일 값일 경우 출력
          <li>{keywords}</li>
        )}
      </ul>
    </div>
  );
}
// [...] (필수 파라미터)
// **[...param].tsx**와 같은 경로는 필수 파라미터를 받는 동적 경로입니다.

// 이 경로는 하나 이상의 값을 포함할 수 있으며, URL에서 해당 파라미터가 반드시 있어야만 페이지가 렌더링됩니다.

// 예를 들어, /pages/[category].tsx에서 category는 필수 파라미터입니다.

// [[...]] (선택적 파라미터)
// **[[...param]].tsx**와 같은 경로는 선택적 파라미터를 받는 동적 경로입니다.

// 이 경우 파라미터가 없을 수도 있으며, URL에서 해당 파라미터가 없어도 해당 페이지가 렌더링됩니다.

// 즉, 파라미터가 있으면 배열로 처리하고, 파라미터가 없으면 undefined나 빈 배열로 처리됩니다.
