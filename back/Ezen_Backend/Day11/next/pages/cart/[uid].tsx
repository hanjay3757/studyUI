import { useRouter } from 'next/router';
import React from 'react';
/**
 * 동적 라우팅 /pages/cart/[uid].tsx
 *cart/hostname, cart/choi
 */
export default function CartpageByUser() {
  const router = useRouter();
  const { uid } = router.query;
  return <div>[uid]</div>;
}
