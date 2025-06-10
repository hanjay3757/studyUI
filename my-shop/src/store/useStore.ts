import { create } from "zustand";
import { CartStore } from "../types/ProductType";
import axios from "axios"

export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    cartItems: [],
    cartCount: 0,

    fetchItems: async () => {
        try {
            const res = await axios.get('https://fakestoreapi.com/products');
            set({ items: res.data });
            console.log(res.data);
        } catch (error) {
            console.log("데이터 에러")
        }
    },
    // 카테고리 별로 
    getItemCategory: (category: string) => {
        const allItem = get().items;
        if (!category || category === "all") return allItem;
        return allItem.filter((item) => item.category === category);
    },
    //장바구니 담기
    addCart: (product) => {
        set((state) => {
            const updateCart = [...state.cartItems, product];
            const updateCount = state.cartCount + 1;
            alert("상품이 장바구니에 담겼습니다")
            return {
                cartItems: updateCart,
                cartCount: updateCount
            }
        })
    }

}))