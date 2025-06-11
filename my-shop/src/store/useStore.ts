import { create } from "zustand";
import { CartStore } from "../types/ProductType";
import axios from "axios"
import { createUserWithEmailAndPassword, sendEmailVerification, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";


export const useCartStore = create<CartStore>((set, get) => ({
    items: [],
    cartItems: [],
    cartCount: 0,
    totalPrice: 0,
    currentUser: null,

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
            //reduce()배열에 있는 데이터를 체크를 하면서 
            //누적값과 현재값 매개변수로 반환 
            const updateTotal = updateCart.reduce((sum, item) => sum + item.price, 0);
            alert("상품이 장바구니에 담겼습니다")
            return {
                cartItems: updateCart,
                cartCount: updateCount,
                totalPrice: updateTotal
            }
        })
    },
    //장바구니 삭제
    removeCart: (id: number) => {
        set((state) => {
            const updateCart = state.cartItems.filter((item) => item.id !== id);
            const updateCount = state.cartCount - 1;
            alert("상품이 삭제 되었습니다")
            return {
                cartItems: updateCart,
                cartCount: updateCount
            }
        })
    },

    // 회원가입
    memberUser: async (user, navigate) => {
        try {
            const { email, password } = user;
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            console.log(firebaseUser);
            //이메일 인증 전송
            await sendEmailVerification(firebaseUser);
            alert("회원가입에 성공했습니다. 이메일 인증을 해주세요");
            if (navigate) navigate("/login")

        } catch (error: any) {
            console.log(error)
            alert("회원가입 실패" + error.message);
        }
    },

    //로그인
    login: async (user, navigate) => {
        try {
            const { email, password } = user;
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;
            console.log(firebaseUser);
            if (!firebaseUser.emailVerified) {
                alert("이메일 인증이 필요합니다,이메일 인증을 처리해주세요");
                return
            }
            set({ currentUser: userCredential.user.email })
            console.log(userCredential.user.email)
            alert("로그인 되었습니다");
            if (navigate) navigate("/member");

        } catch (error: any) {
            alert("로그인 실패" + error.message)

        }
    },

    //로그아웃
    logout: async () => {
        await signOut(auth);
        set({ currentUser: null })
        alert("로그아웃되었습니다")
    }
}))