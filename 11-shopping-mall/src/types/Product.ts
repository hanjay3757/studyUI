export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}
export interface User {
  email: string;
  username: string;
  password: string;
  name: {
    firstname: string;
    lastname: string;
  };
  address: {
    city: string;
    street: string;
    number: number;
    zipcode: string;
    geolocation: {
      lat: string;
      long: string;
    };
  };
  phone: string;
}

export interface LoginUser {
  email: string;
  password: string;
}

export interface CartStore {
  items: Product[];
  cartItems: Product[];
  currentUser: string | null;
  totalPrice: number;
  cartCount: number;

  fetchItems: () => void;
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;

  memberUser: (user: User, navigate?: (path: string) => void) => Promise<void>; // ✅ 수정
  login: (user: LoginUser, navigate?: (path: string) => void) => Promise<void>;
  logout: () => void;
  getItemsByCategory: (category: string) => Product[];
  setCurrentUser: (email: string) => void;
}


export type MenuItem = {
  key: string;
  label: string;
};
