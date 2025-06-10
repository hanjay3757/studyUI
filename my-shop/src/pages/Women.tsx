import React from 'react'
import Title from '../components/Title'
import CategoryPage from '../components/CategoryPage'

const Women = () => {
  return (
    <div className='container'>
       <div><img src="./images/women-sub-banner.jpg" alt="" /></div>
      <div className="content-inner">
        <Title title="여자" />
        <CategoryPage categoryName="women's clothing" />
      </div>

    </div>
  )
}

export default Women
