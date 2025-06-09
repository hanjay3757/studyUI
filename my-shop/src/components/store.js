import { create } from "zustand";

export const useCouterStore = create(set => ({
    count: 0,
    setCount: () => set(prev => ({ count: prev.count + 1 })),
    msg:""
}))