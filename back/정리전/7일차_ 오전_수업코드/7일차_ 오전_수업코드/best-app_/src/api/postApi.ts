//post관련 api요청을 서버에 보내는 모듈
import type { Post } from "../components/posts/types/Post";
import axiosInstance from "./axiosInstance";
//응답 유형
export interface PostResponse{
    data: Post[];
    totalCount:number;
    totalPages: number;
}
// ----post 목록 가져오기---------------
export const apiFetchPostList = async(page:number) : Promise<PostResponse> =>{
    const response = await axiosInstance.get('/posts',{params:{page}});
    //response.data.data ==> 글목록
    //response.data.totalCount ==> 게시글수
    return response.data;
}
//---post 새글 등록하기------------------------
export const apiCreatePost = async(data: FormData): Promise<Post> =>{
    const response = await axiosInstance.post('/posts',data,{
        headers:{
            'Content-Type':'multipart/form-data'
        }
    });
    return response.data as Post;
}
//----특정 글 가져오기 ------------------------------
export const apiFetchPostById = async (id: string): Promise<Post | null> =>{
    const response = await axiosInstance.get(`/posts/${id}`)
    const data = response.data;
    // console.log('특정글 data: ', data);    
    if(data){
        // console.log('**********************');
        // console.log(data.data[0]);        
        return data.data[0] as Post;
    }else{
        return null;
    }
}//---------------------------------------------

// 글 삭제----------------------------------
export const apiDeletePost = async (id: string): Promise<void>=>{
    //delete /api/posts/100
    console.log('apiDeletePost: ',id);
    
    await axiosInstance.delete(`/posts/${id}`)
}
//글 수정--------------------------------------------
export const apiUpdatePost = async (formData:FormData, id:string): Promise<void> =>{
    await axiosInstance.put(`/posts/${id}`, formData,{
        headers:{'Content-Type':'multipart/form-data'}
    })
}