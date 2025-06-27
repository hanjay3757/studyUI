import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Row, Col} from 'react-bootstrap'
import Header from './components/Header'
import Side from './components/Side'
import Footer from './components/Footer'
import Home from './pages/Home'
import PostApp from './pages/PostApp'
import PostView from './components/posts/PostView'
import PostEdit from './components/posts/PostEdit'
import SignUpForm from './components/users/SignUpForm'
import UserList from './components/users/UserList'
import LoginModal from './components/users/LoginModal'
import { useEffect, useState } from 'react'
import { useAuthStore } from './stores/authStore'
import type { AuthUser } from './stores/authStore'
import axiosInstance from './api/axiosInstance'
import ChatApp from './components/chat/ChatApp'

function App() {
    const [showLogin, setShowLogin] = useState<boolean>(false)
    //로그인 액션 가져오기
    const loginAuthUser = useAuthStore(s=>s.loginAuthUser)
    const setLoading = useAuthStore(s=>s.setLoading)

    const requestAuthUser = async()=>{
        try{
            //accessToken가지고 서버쪽에 인증된 사용자 정보를 요청
            const accessToken = sessionStorage.getItem('accessToken');
            if(accessToken){
                const response=await axiosInstance.get<AuthUser>('/auth/user',{
                    headers:{
                        Authorization: `Bearer ${accessToken}`
                    }
                })
                const authUser = await response.data;
                loginAuthUser(authUser)//인증 사용자 정보 state 셋팅후 로딩상태를 false로 설정
                setLoading(false)
            }else{
                setLoading(false)
            }
        }catch(error: any){
            console.error('accessToken이 유효하지 않아요',error);
            alert(error)
            sessionStorage.removeItem('accessToken')
            localStorage.removeItem('refreshToken')
        }finally{
            setLoading(false)
        }

    }
    useEffect(()=>{
        requestAuthUser();
    },[loginAuthUser, setLoading])

  return (
   <>
            <div className="container fluid py-5">
                <BrowserRouter>
                    <Row>
                        <Col className="mb-5">
                            <Header />
                        </Col>
                    </Row>
                    <Row className="main">
                        <Col xs={12} sm={4} md={4} lg={3} className="d-none d-sm-block mt-3">
                            <Side setShowLogin={setShowLogin} />
                        </Col>
                        <Col xs={12} sm={8} md={8} lg={9}>
                            {/* 로그인 모달 */}
                            <LoginModal show={showLogin} setShowLogin={setShowLogin} />

                            {/* 라우트 */}
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/posts" element={<PostApp/>} />
                                <Route path="/posts/:id" element={<PostView/>} />
                                <Route path="/postEdit/:id" element={<PostEdit/>}/>
                                <Route path="/signup" element={<SignUpForm/>}/>
                                <Route path="/admin/users" element={<UserList/>}/>
                                <Route path="/chatting" element={<ChatApp/>}/>
                            </Routes>
                        </Col>
                    </Row>
                    <Row>
                        <Col lg={12}></Col>
                    </Row>
                </BrowserRouter>
            </div>
            <Footer />
        </>
  )
}

export default App
