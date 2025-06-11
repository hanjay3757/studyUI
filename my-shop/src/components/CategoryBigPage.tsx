import React, { useEffect } from 'react'
import { useCartStore } from '../store/useStore'
import SectionBigSwiper from './SectionBigSwiper';



const CategoryBigPage = ({ categoryName, imgUrl }: { categoryName: string, imgUrl: string }) => {
    const { items, fetchItems, getItemCategory } = useCartStore();
    useEffect(() => {
        if (items.length === 0) {
            fetchItems()
        }
    }, [fetchItems, items])
    return (
        <div className="goods-list-big">
            <div className="big-img">
                <img src={`./images/${imgUrl}-big.jpg`} alt="" />
            </div>
            <div className='big-swiper'>
                <SectionBigSwiper category={items} />
            </div>
        </div>
    )
}

export default CategoryBigPage
