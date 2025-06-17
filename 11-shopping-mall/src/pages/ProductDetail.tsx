// src/pages/ProductDetail.tsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import { Product } from '../types/Product';
import axios from 'axios';
import { useCartStore } from '../store/useCartStore';
import "./productDetail.scss";
import { Product } from '../types/Product';


const ProductDetail = () => {
    const { id } = useParams<{ id: string }>();
    const [product, setProduct] = useState<Product | null>(null);
    const addToCart = useCartStore((state) => state.addToCart);

    useEffect(() => {
        if (!id) return;
        axios.get<Product>(`https://fakestoreapi.com/products/${id}`)
            .then(res => setProduct(res.data))
            .catch(console.error);
    }, [id]);

    console.log(product)
    if (!product) return <div>로딩 중...</div>;

    return (
        <div className='container'>
            <div className="content-inner">
                <div className="product-detail">
                    <div className='img-box'><img src={product.image} alt={product.title} width={200} /></div>
                    <div className="text-box">
                        <p className='cate-title'>{product.category}</p>
                        <h2 className='item-title'>{product.title}</h2>
                        <div className='price-wrap'>
                            <p>${product.price}</p>
                            {/* <p> <strong>etrt</strong><span>20%</span></p> */}
                        </div>
                        <p>{product.description}</p>

                        <div className="btn">
                            <button className='white-btn' onClick={() => addToCart(product)}>찜하기</button>
                            <button className="black-btn" onClick={() => addToCart(product)}>장바구니 담기</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
