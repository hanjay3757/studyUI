export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  category: string;
  rating: {
    count: number;
    rate: number;
  };
}

export interface CartStore {
  items: Product[];
  cartItems: Product[];
  cartCount: number;
  totalPrice: number; // 이 속성이 인터페이스에 정의되어 있어야 함

  fetchItems: () => Promise<void>;
  getItemCategory: (category: string) => Product[];
  addCart: (product: Product) => void;
  removeCart: (id: number) => void; // 이 메서드도 인터페이스에 정의되어 있어야 함
}
