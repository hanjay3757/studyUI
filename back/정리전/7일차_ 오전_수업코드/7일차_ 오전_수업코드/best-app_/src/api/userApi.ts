//userApi.ts
import axiosInstance from "./axiosInstance";
import type { User, CreateUserResponse,CreateEmailResponse } from "../components/users/types/User";

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