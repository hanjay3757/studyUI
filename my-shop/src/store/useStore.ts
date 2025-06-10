import { create } from "zustand";
import { CartStore } from "../types/ProductType";
import axios from "axios";

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  fetchItems: async () => {
    try {
      const res = await axios.get("https://fakestoreapi.com/products");
      set({ items: res.data });
      console.log(res.data);
    } catch (error) {
      console.log("데이터 에러");
    }
  },
  // 카테고리 별로
  getItemCategory: (category: string) => {
    const allItem = get().items;
    if (!category || category === "all") return allItem;
    return allItem.filter((item) => item.category === category);
  },
}));
