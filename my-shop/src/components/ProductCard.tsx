import React from "react";

const ProductCard = () => {
  return (
    <div className="product-list">
      <div className="img-box">img-box</div>
      <div className="text-box">
        <h3>제품제목</h3>
        <div>
          <strong>30%</strong>
          <p>가격</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
