import React from 'react'
import Title from '../components/Title'
import CategoryPage from '../components/CategoryPage'

const Man = () => {
    return (
        <div className="container">
            <CategoryPage
                title="남자"
                subTitle=""
                imgUrl="man"
                categoryName="men's clothing"
            />
        </div>
    )
}

export default Man