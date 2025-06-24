import React from 'react'
import { Link } from 'react-router-dom';
import "./scss/header.scss"
import { useCartStore } from '../store/useStore';
type MenuItem = {
    key: string;
    label: string;
}
const menus: MenuItem[] = [
    { key: 'man', label: "남자" },
    { key: 'women', label: "여자" },
    { key: 'jewelery', label: "보석" },
    { key: 'electric', label: "전자제품" },
]
const Header = () => {
    const { cartCount, currentUser, logout } = useCartStore();

    const username = currentUser?.includes("@") ? currentUser.split("@")[0] : currentUser

    return (
        <header>
            <div className="content-inner">
                <div className="header-left">
                    <h1 className='logo'>
                        <Link to="/"><img src="./images/logo.svg" alt="logo" /></Link>
                    </h1>
                    <nav>
                        <ul>
                            {menus.map((menu) =>
                                <li key={menu.key}>
                                    <Link to={`/${menu.key}`}>{menu.label}</Link>
                                </li>
                            )}
                        </ul>
                    </nav>
                </div>
                <div className="header-right">
                    <ul>
                        {currentUser ? (
                            <>
                                <li>
                                    <Link to="/" onClick={logout}>
                                        <img src="./images/loginPassword.png" />
                                        <p>LOGOUT</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/member">
                                        <img src="./images/loginMember.png" />
                                        <p>{username}</p>
                                    </Link>
                                </li>
                            </>
                        ) : (
                            <>
                                <li>
                                    <Link to="/login">
                                        <img src="./images/loginPassword.png" />
                                        <p>LOGIN</p>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/signup">
                                        <img src="./images/loginMember.png" />
                                        <p>MEMBER</p>
                                    </Link>
                                </li>
                            </>
                        )}
                        <li>
                            <Link to="/cart">
                                <img src="./images/cart.png" alt="" />
                                <p>장바구니<span className='cart-num'>{cartCount}</span></p>
                            </Link>
                        </li>
                    </ul>
                    <div className="search-btn">
                        <input type="text" placeholder='search' />
                        <p className='search-icon'><img src="./images/search.png" alt="" /></p>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header
