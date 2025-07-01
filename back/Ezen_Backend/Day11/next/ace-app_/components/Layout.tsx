import React from 'react'
import Header from './Header'
import Footer from './Footer'

export default function Layout({children}:{children: React.ReactNode}) {
    //children은  _app.tsx의 App컴포넌트가 들어옴
  return (
    <>
        <Header/>
        <main style={{minHeight:'80vh', padding:'2rem'}}>
            {children}
        </main>
        <Footer/>
      
    </>
  )
}
