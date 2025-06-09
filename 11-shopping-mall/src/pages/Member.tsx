import React from 'react'
import { useCartStore } from '../store/useCartStore'

const Member = () => {
    const currentUser = useCartStore(state => state.currentUser);
    return (
        <div className="container">
            <div className='content-inner main'>
                <div className="titleBox">
                    <h2 className='title'>회원정보 변경</h2>
                   <p>{currentUser}님 환영합니다</p>
                </div>
            </div>
        </div>
    )
}

export default Member