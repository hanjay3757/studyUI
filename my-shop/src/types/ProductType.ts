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
    }
}
export interface User {
    email: string;
    username: string;
    password: string;
    name: {
        firstname: string;
        lastname: string;
    }
    phone: string
}
export interface LoginUser {
    email: string;
    password: string;
}
export interface CartStore {
    items: Product[],
    cartItems: Product[],
    cartCount: number,
    totalPrice: number,
    currentUser: string | null,

    fetchItems: () => void;
    getItemCategory: (category: string) => Product[];
    addCart: (product: Product) => void;
    removeCart: (id: number) => void;
    memberUser: (user: User, navigate?: (path: string) => void) => void;
    login: (user: LoginUser, navigate?: (path: string) => void) => void;
    logout: () => void;
}