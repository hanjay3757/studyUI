import { create } from 'zustand';
import type { Product } from '@/types/Product';

interface CartItem {
  id: number;// product_id 상품번호
  name: string; //상품명
  price: number; //상품가격
  image_url: string;//상품 이미지
  quantity: number;//장바구니에 담은 수량
  user_id?:number;//로그인 붙여야 사용 가능 (임의의 사용자 아이디를 붙여 테스트해보자 - hong)
}

interface CartStore {
  items: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}


export const useCartStore = create<CartStore>((set) => ({
  items: [],
  addToCart: (item) =>
    set((state) => {
      //우선 배열을 이용해 장바구니 기능을 메모리에 보관해서 구현해보고=> 이 경우 새로고침 하면 장바구니는 날라감 
      //백엔드 쪽에서 cart_items 테이블과 연동하는 장바구니 기능을 구현해보자
      const exists = state.items.find((i) => i.id === item.id);
      if (exists) {
        //장바구니에 상품 추가시 추가하는 상품이 이미 장바구니에 존재하는 상품이라면 수량만 추가한다 
        //DB 와 연동할 때는 추가하는 특정 유저의 아이디와 상품번호로 count를 세어 0보다 크다면 update 문을 이용해 수량를 수정(추가)
        return {
          items: state.items.map((i) =>
            i.id === item.id ? { ...i, quantity: i.quantity + item.quantity } : i
          ),
        };
      } else {
        //상품 추가시 추가하는 상품이 장바구니에 없는 상품이라면 장바구니 상품목록(items)에 추가
        //DB 연동시에는 insert 문으로 cart_items테이블에 새로운 레코드를 삽입한다
        return { items: [...state.items, item] };
      }
    }),
  clearCart: () => set({ items: [] }),
}));
