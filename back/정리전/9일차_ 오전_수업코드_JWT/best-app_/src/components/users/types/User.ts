import type { AuthUser } from "../../../stores/authStore";

export interface User{
    id?:number;
    name: string;
    email: string;
    passwd: string;
    role: Role
}
export type Role ='USER'|'ADMIN';

//공통 api 응답 
export interface ApiResponse<T = undefined>{
    result:'success'|'fail';
    message: string;
    data?: T; //성공 시에만 존재
}
// 회원가입 성공시 payload
export interface CreateUserData{
    insertId: number;
}
//로그인 응답시  payload
export type AuthUserResponse = ApiResponse<AuthUser>
//AuthUser(id,name,email,role,accessToken,refreshToken)

// 회원가입 응답
export type CreateUserResponse = ApiResponse<CreateUserData>;

export interface CreateEmailResponse{
    result:'ok'|'duplex';
    message:string;   
}
export interface UserListResponse{
    id:number;
    name:string;
    email:string;
    indate: string;
    role:Role|string;
}