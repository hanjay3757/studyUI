import React from 'react'
import Title from '../components/Title'
import CategoryPage from '../components/CategoryPage'
import SubLayout from '../components/SubLayout'

const Man = () => {
  return (
    <>
      <SubLayout title="남자" imgUrl='man' categoryName="men's clothing"  />
    </>
    // <div className='container'>
    //   <div><img src="./images/man-sub-banner.jpg" alt="" /></div>
    //   <div className="content-inner">
    //     <Title title="남자" />
    //     <CategoryPage categoryName="men's clothing" />
    //   </div>
    // </div>
  )
}

export default Man
