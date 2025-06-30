//입력 폼과 관련된 스토아

import { create } from "zustand";

//파일업로드 FormData객체 통해 전송해야 함
interface PostFormState{
    formData:{
        writer:string;
        title:string;
        content:string;
        file:string;
        newFile: File | null;
    };
    setFormData: (data: Partial<PostFormState['formData']>)=>void;
    //Partial : 객체의 모든 속성을 선택적(optional)으로 바꿔줌
    resetForm: ()=>void;
}
export const usePostFormStore = create<PostFormState>((set)=>({
    formData:{
        writer:'',
        title:'',
        content:'',
        file:'',
        newFile:null,
    },
    setFormData:(data)=>(
        set((state)=>({
            formData:{
                ...state.formData,
                ...data
            }            
        }))         
    ),
    resetForm:()=>set({formData:{
        writer:'',
        title:'',
        content:'',
        file:'',
        newFile:null
    }})   
}))
