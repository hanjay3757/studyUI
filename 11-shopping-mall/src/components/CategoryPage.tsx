// src/components/CategoryPage.tsx
import React, { useEffect } from 'react';
import { useCartStore } from '../store/useCartStore';
import Title from '../components/Title'
import SectionSwiper from './SectionSwiper';


interface CategoryPageProps {
  title: string;
  subTitle?: string;
  imgUrl?: string;
  categoryName: string;
}

const CategoryPage = ({ title, subTitle = '', imgUrl = '', categoryName }: CategoryPageProps) => {
  const { fetchItems, getItemsByCategory, items } = useCartStore();
  const categoryItems = getItemsByCategory(categoryName);

  useEffect(() => {
    if (items.length === 0) {
      fetchItems();
    }
  }, [fetchItems, items]);

  return (
    <>
      <div className='sub-banner-img'><img src={`./images/${imgUrl}-sub-banner.jpg`} alt="" /></div>
      <div className='content-inner main'>
        <Title title={title} subTitle={subTitle} />
        <SectionSwiper category={categoryItems} />
      </div>
    </>
  );
};

export default CategoryPage;
