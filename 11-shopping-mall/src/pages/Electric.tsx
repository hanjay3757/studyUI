import React from 'react'
import Title from '../components/Title'
import CategoryPage from '../components/CategoryPage'

const Electric = () => {
    return (
        <div className="container">
           <CategoryPage
                title="전자제품"
                subTitle=""
                imgUrl="electronics"
                categoryName="electronics"
            />
        </div>
    )
}

export default Electric