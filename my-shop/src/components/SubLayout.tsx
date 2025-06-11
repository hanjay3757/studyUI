import React from 'react'
import Title from './Title'
import CategoryPage from './CategoryPage'

const SubLayout = ({title,imgUrl,categoryName}:{title:string,imgUrl:string,categoryName:string}) => {
  return (
    <div className='container'>
      <div><img src={`./images/${imgUrl}-sub-banner.jpg`} alt="" /></div>
      <div className="content-inner">
        <Title title={title} />     
        <CategoryPage categoryName={categoryName} />
      </div>
    </div>
  )
}

export default SubLayout
