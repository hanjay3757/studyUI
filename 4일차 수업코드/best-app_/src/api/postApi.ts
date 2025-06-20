//post관련 api요청을 서버에 보내는 모듈
import type { Post } from "../components/posts/types/Post";
import axiosInstance from "./axiosInstance";
//응답 유형
export interface PostResponse{
    data: Post[];
    totalCount:number;
    //totalPages: number;
}
// ----post 목록 가져오기---------------
export const apiFetchPostList = async() : Promise<PostResponse> =>{
    const response = await axiosInstance.get('/posts');
    //response.data.data ==> 글목록
    //response.data.totalCount ==> 게시글수
    return response.data;
}