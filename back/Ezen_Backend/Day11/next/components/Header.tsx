import Link from 'next/link';
import React from 'react';

export default function Header() {
  return (
    <header>
      <div className="bg-gray-800 text-white p-2">
        <nav className="flex gap-4 items-center justify-between">
          <div className="flex gap-4">
            <Link href={'/'}>ACE Shop</Link>
            <Link href={'/products'}>상품</Link>
            <Link href={'/admin/timeDeal'}>타임딜관리</Link>
          </div>

          <div className="flex gap-4 ml-auto">
            <Link className="p-1" href={'/about'}>
              About
            </Link>
            <Link className="p-1" href={'/cart/King'}>
              Cart
            </Link>
            <Link className="p-1" href={'/category/Clothes/100'}>
              Category
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
