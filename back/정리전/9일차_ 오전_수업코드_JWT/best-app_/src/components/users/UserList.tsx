import { useState, useEffect } from 'react'
import type { User, UserListResponse } from './types/User'
import { apiUserList } from '../../api/userApi'
import { useAuthStore } from '../../stores/authStore'
import { useNavigate } from 'react-router-dom'

export default function UserList(){

    const [users, setUsers] = useState<UserListResponse[]>([])
    const [loading, setLoading] = useState<boolean>(true)

    //인증받은 사용자 state 받기
    const authUser = useAuthStore(s=>s.authUser)
    const navigate =useNavigate();

    useEffect(()=>{
        //인증 사용자, 인가 사용자(권한:ADMIN) 여부를 검사하는 로직
        if(!authUser){
            alert('로그인이 필요해요')
            navigate('/')
            return;
        }
        //관리자가 아닌 경우
        if(authUser.role !=='ADMIN'){
            alert('관리자만 이용 가능합니다');
            navigate('/')
            return;
        }
        //관리자일 경우 사용자 목록 가져오기 - API 요청
        const fetchUsers = async()=>{
            try{
                const res = await apiUserList();
                setUsers(res);
            }catch(error: any){
                alert('회원목록 조회 중 에러 발생 '+error.message)
            }finally{
                setLoading(false)
            }
        }
        fetchUsers()
    },[])


    if(loading){
        return <div><h4 className='text-center my-4'>Loading ...</h4></div>
    }

    return(
        <div className="container py-3">
            <h2 className='text-center my-4'>회원 목록 [Admin Page-관리자 전용]</h2>
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th>회원ID</th>
                        <th>이  름</th>
                        <th>이메일</th>
                        <th>등록일</th>
                        <th>ROLE</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u)=>(
                    <tr key={u.id}>
                        <td>{u.id}</td>
                        <td>{u.name}</td>
                        <td>{u.email}</td>
                        <td>{u.indate}</td>
                        <td>{u.role}</td>
                    </tr>))}
                </tbody>
            </table>
        </div>
    )
}