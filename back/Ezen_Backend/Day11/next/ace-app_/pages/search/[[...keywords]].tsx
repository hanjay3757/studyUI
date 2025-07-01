import React from 'react'
import { useRouter } from 'next/router'

// /search/notebook/apple/mac 
//==> catch all라우팅  /pages/search/[...keywords].tsx
//이 경우는 search/a,  search/a/b/c 와 같이 1개 이상의 세그먼트가 있을 때만 매치된다
// /search => 매치되지 않고 404발생
// optional catch all [[...keywords]].tsx => 선택적 라우트가 되어 /search도 매치되어 나온다

export default function SearchPage() {

    const router = useRouter();
    const {keywords} =router.query; //keywords는 string[] 또는 string, 또는 undefined 값이 들어올 수 있음
  if(!keywords)
    return <h3>검색어가 없습니다</h3>  

  return (
    <div>
      <h1>검색 결과</h1>
      <h3>검색 키워드</h3>
      <ul>
        {Array.isArray(keywords)?keywords.map((word,i)=>(<li key={i}>{word}</li>)):<li>{keywords}</li>}
      </ul>
    </div>
  )
}
