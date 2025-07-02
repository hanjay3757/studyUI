import Link from 'next/link';
import { GiShop } from "react-icons/gi";

export default function Header() {
  return (
    <header style={{ background: '#222', color: '#fff', padding: '1rem' }}>
      <nav style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <Link href="/"><h2 style={{ margin: 0 }}>ACE SHOP</h2></Link>
        <Link href="/products">상품</Link>
        <Link href="/admin/timeDeal">타임딜 관리</Link>

        {/* 오른쪽 정렬할 부분 : margin-left: auto를 주면, 그 요소는:
          "왼쪽에 가능한 만큼의 여백을 만들어서, 최대한 오른쪽으로 밀리는" 효과를 낸다*/}
        <div style={{ marginLeft: 'auto', display: 'flex', gap: '1rem' }}>
          <Link href="/about">About</Link>
          <Link href="/posts">Posts</Link>
          <Link href="/cart/hong">Cart</Link>
        </div>
      </nav>
    </header>
  );
}
