//userApi.ts
import axiosInstance from "./axiosInstance";
import type { User, CreateUserResponse,CreateEmailResponse,UserListResponse, AuthUserResponse } from "../components/users/types/User";
import type { AuthUser } from "../stores/authStore";

//회원가입 요청
export const apiSignUp = async(user: User) : Promise<CreateUserResponse> =>{

    const response = await axiosInstance.post('/users', user)
    return response.data; //result,msg, data:{insertId:회원번호}
}
//이메일 중복 체크
export const apiCheckEmail = async (email: string): Promise<CreateEmailResponse> =>{
    const response = await axiosInstance.post('/users/duplex', {email});
    return response.data;
}
//전체 회원 목록 /api/admin/users
export const apiUserList = async (): Promise<UserListResponse[]> =>{
    const response = await axiosInstance.get('/admin/users')
    return response.data;
}

export const apiSignIn= async (loginUser:{email:string,passwd:string}): Promise<AuthUserResponse> =>{
    const response = await axiosInstance.post('/auth/login', loginUser);
    return response.data;
}
