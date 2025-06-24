import React from 'react'
import Title from '../components/Title'
import CategoryPage from '../components/CategoryPage'
import SubLayout from '../components/SubLayout'


const Women = () => {
  return (
    <>
      <SubLayout title="여자" imgUrl='women' categoryName="women's clothing" />
    </>
    // <div className='container'>
    //    <div><img src="./images/women-sub-banner.jpg" alt="" /></div>
    //   <div className="content-inner">
    //     <Title title="여자" />
    //     <CategoryPage categoryName="women's clothing" />
    //   </div>

    // </div>
  )
}

export default Women
