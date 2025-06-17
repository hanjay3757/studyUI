import React, { useEffect } from 'react';
import { Link } from "react-router-dom";
import { useCartStore } from '../store/useCartStore';  // Zustand 훅
import "./header.scss";

type MenuItem = {
    key: string;
    label: string;
};

const menus: MenuItem[] = [
    { key: 'man', label: '남자' },
    { key: 'women', label: '여자' },
    { key: 'jewelery', label: '보석' },
    { key: 'electronics', label: '전자제품' },
];

const Header = () => {
    const currentUser = useCartStore(state => state.currentUser);
    const logout = useCartStore(state => state.logout);
    const cartCount = useCartStore(state => state.cartCount);
    const setCurrentUser = useCartStore(state => state.setCurrentUser);

    // ⏰ 자동 로그아웃 감지 및 상태 업데이트
    // useEffect(() => {
    //     const loginTime = localStorage.getItem("loginTime");
    //     if (loginTime) {
    //         const now = Date.now();
    //         const diff = now - Number(loginTime);
    //         const maxTime = 2 * 60 * 1000; // 2분

    //         if (diff >= maxTime) {
    //             handleAutoLogout();
    //         } else {
    //             const remaining = maxTime - diff;
    //             const timer = setTimeout(() => {
    //                 handleAutoLogout();
    //             }, remaining);
    //             return () => clearTimeout(timer);
    //         }
    //     }
    // }, [currentUser]); // currentUser가 바뀔 때마다 타이머 리셋

    // const handleAutoLogout = async () => {
    //     await logout();
    //     localStorage.removeItem("loginTime");
    //     setCurrentUser("");
    //     alert("자동 로그아웃 되었습니다.");
    // };

    const username = currentUser?.includes('@')
        ? currentUser.split('@')[0]
        : 'Guest';

    return (
        <header className="header">
            <div className="content-inner">
                <div className="header-left">
                    <h1 className="logo">
                        <Link to="/"><img src="./images/logo.svg" alt="Logo" /></Link>
                    </h1>
                    <nav>
                        <ul>
                            {menus.map((menu) => (
                                <li key={menu.key}>
                                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </div>
                <div className='header-right'>
                    <ul>
                        {currentUser ? (
                            <>
                                <li className='login'>
                                    <div className="userShow" onClick={logout}>
                                        <Link to="/">
                                            <img src="./images/loginPassword.png" alt="logout" />
                                            <p>LOGOUT</p>
                                        </Link>
                                    </div>
                                </li>
                                <li className='signup'>
                                    <Link to="/member">
                                        <img src="./images/loginMember.png" alt="member" />
                                        <p>{username}</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <img src="./images/loginPassword.png" alt="login" />
                                        <p>LOGIN</p>
                                    </Link>
                                </li>
                                <li className='signup'>
                                    <Link to="/signup">
                                        <img src="./images/loginJoin.png" alt="signup" />
                                        <p>MEMBER</p>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li className='cart'>
                            <Link to="/cart">
                                <img src="./images/cart.png" alt="cart" />
                                <p>장바구니<span className='cart-num'>{cartCount}</span></p>
                            </Link>
                        </li>
                    </ul>

                    <div className='search-bar'>
                        <input type="text" placeholder='SEARCH' />
                        <p className='search-icon'><img src="./images/search.png" alt="search" /></p>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
