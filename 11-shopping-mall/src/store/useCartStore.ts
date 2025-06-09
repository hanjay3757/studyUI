// src/store/useCartStore.ts
import { create } from 'zustand';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from '../firebase/firebase';  // Firebase 설정 가져오기
import { Product, CartStore } from '../types/Product';


export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    cartItems: [],
    cartCount: 0,
    currentUser: null,
    totalPrice: 0,

    fetchItems: async () => {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        set({ items: data });
    },

    getItemsByCategory: (category: string) => {
        const allItems = get().items;
        if (!category || category === "all") return allItems;
        return allItems.filter((item) => item.category === category);
    },

    addToCart: (product) => {
        set((state) => {
            const updatedCart = [...state.cartItems, product];
            // reduce() 메서드는 배열의 각 요소를 순회하면서 
            // 누적값(sum)과 현재 요소(item)를 매개변수로 받는 콜백 함수를 실행
            // reduce는 예외적으로 첫번째, 두번째가 필수 요소이다.
            // 첫번째 파라미터 sum은 이전 배열 요소로 수행했던 함수의 결과값이 들어온다.
            // reduce의 두번째 파라미터 0은 reduce 첫번째 파라미터의 함수의 첫번째 파라미터 sum의 초기값이다.
            const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
            const updatedCount = state.cartCount + 1;

            alert('상품이 장바구니에 담겼습니다');
            console.log('추가된 장바구니:', updatedCart);
            return {
                cartItems: updatedCart,
                totalPrice: updatedTotal,
                cartCount: updatedCount
            };
        });

    },

    removeFromCart: (id: number) => {
        set((state) => {
            const updatedCart = state.cartItems.filter((item) => item.id !== id);
            const updatedTotal = updatedCart.reduce((sum, item) => sum + item.price, 0);
            const updatedCount = state.cartCount - 1;
            return {
                cartItems: updatedCart,
                totalPrice: updatedTotal,
                cartCount: updatedCount
            };
        });
    },


    memberUser: async (user, navigate) => {
        try {
            const { email, password } = user;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            set({ currentUser: userCredential.user.email });
            alert('회원가입 성공! 자동 로그인 되었습니다.');
            if (navigate) navigate("/member"); // navigate 있으면 이동
        } catch (error: any) {
            console.error("회원가입 실패:", error.message);
            alert('회원가입 실패: ' + error.message);
        }
    },

    login: async (user, navigate) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, user.email, user.password);
            set({ currentUser: userCredential.user.email });
            alert("로그인 되었습니다.");
            if (navigate) navigate("/member"); // navigate 있으면 이동

        } catch (error: any) {
            console.error("로그인 실패:", error.message);
            alert("로그인 실패: " + error.message);
        }
    },


    logout: async () => {
        await signOut(auth);
        set({ currentUser: null });
        alert("로그아웃 되었습니다.");
    },

    setCurrentUser: (email: string) => set({ currentUser: email }),

}));
