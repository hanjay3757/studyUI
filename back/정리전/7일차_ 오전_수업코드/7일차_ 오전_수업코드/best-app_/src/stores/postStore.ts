/*
postStore.ts : post목록 가져오기, 1건 post조회, post삭제 관리 (서버 통신 로직 중심)
postFormStore.ts: post 글쓰기/글수정에 필요한 폼 입력 상태 관리 (UI상태 중심)
*/ 
import { create } from "zustand";
import type { Post } from "../components/posts/types/Post";
import { apiFetchPostList, apiFetchPostById, apiDeletePost } from "../api/postApi";

interface PostState{
    postList: Post[]; //글 목록
    
    totalCount: number;//총 게시글수
    totalPages: number;//총 페이지 수
    page:number;//현재 보여줄 페이지 번호
    size: number;//한 페이지 당 보여줄 목록 개수

    post: Post | null; //특정 게시글
    setPage: (page:number)=>void;//페이지 변경
    fetchPostList: ()=>Promise<void>; //글목록 가져오기
    fetchPostById: (id: string) =>Promise<void>;
    deletePost: (id: string) => Promise<boolean>;//삭제
}
export const usePostStore = create<PostState>((set, get)=>({
    postList:[],
    totalCount:0,
    totalPages:0,
    page:1, //1페이지
    size:3,   
    post:null,
    setPage:(page:number)=>set({page:page}),
    fetchPostList: async()=>{
        const {page}=get(); //get()함수로 page state값 가져오기
        try {
            //api호출==>반환해주는 목록,게시글수를 set 
            const data = await apiFetchPostList(page);

            set({
                postList: data.data,
                totalCount: data.totalCount,
                totalPages: data.totalPages,
            })
        } catch (error) {
            alert('목록 가져오기 실패: '+ (error as Error).message)
        }
    },
    fetchPostById: async(id) =>{
        try {
            const post = await apiFetchPostById(id);
            set({post})
        } catch (error) {
            alert('글 내용 보기 실패: '+(error as Error).message)
        }
    },
    deletePost: async(id)=>{
        try {
            await apiDeletePost(id);
            set({post: null}) //글내용을 null로 처리
            return true;
        } catch (error) {
            alert('글 삭제 실패: '+(error as Error).message)
            return false;
        }        
    },
}))