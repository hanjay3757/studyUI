/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  /**reactStrictMode: true: React의 Strict Mode를 활성화합니다.
   *  이는 개발 중에 잠재적인 문제를 더 쉽게 발견할 수 있게 도와줍니다. 예를 들어, useEffect 훅이 두 번 실행되는 현상(예: 상태 변경)을 방지하고,
   * 불필요한 리렌더링이나 사이드 이펙트를 줄이는 데 유용합니다.
   * reactStrictMode: false: Strict Mode를 비활성화하여 컴포넌트가 두 번 렌더링되는 것을 막을 수 있습니다.
   *  보통, 일부 라이브러리나 코드에서 React Strict Mode로 인해 이상한 동작을 보일 때 이 설정을 비활성화하기도 합니다.
   *  */
};

export default nextConfig;
