import { Product } from "../types/ProductType";
import "./scss/Product.scss";

interface sendItem {
  product: Product;
}

const ProductCard = ({ sendItem }: { sendItem: Product }) => {
  return (
    <div>
      <div className="img-box">
        <img src={sendItem.Image} alt="제품 이미지" />
      </div>
      <div className="text-box">
        <img src={sendItem.Image} alt="제품 이미지" />
        <h3>제품제목</h3>
        <div>
          <strong>30%</strong>
          <p>{sendItem.price}</p>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
