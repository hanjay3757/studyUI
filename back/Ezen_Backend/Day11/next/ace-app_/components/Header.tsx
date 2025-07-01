import React from 'react'
import Link from 'next/link'

export default function Header() {
  return (
    <header style={{background:'#222', color:'#fff', padding:'1rem'}}>
        <nav style={{display:'flex', gap:'1rem', alignItems:'center'}}>
            <Link href="/"><h2>ACE Shop</h2></Link>
            <Link href="/products">상품</Link>
            <Link href="/admin/timeDeal">타임딜 관리</Link>

            <div style={{marginLeft:'auto', display:'flex', gap:'1rem'}}>
                <Link href="/about">About</Link>
                <Link href="/cart/King">Cart</Link>
                <Link href="/category/Clothes/100">Category</Link>
            </div>
        </nav>      
    </header>
  )
}
