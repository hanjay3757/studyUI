// src/pages/Signup.tsx
import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import Title from '../components/Title';
import "./form.scss";
import { useNavigate } from 'react-router-dom';

const Signup = () => {
    const memberUser = useCartStore((state) => state.memberUser);
    const navigate=useNavigate();

    const [form, setForm] = useState({
        email: '',
        username: '',
        password: '',
        firstname: '',
        lastname: '',
        phone: '',
    });

    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: name === 'number' ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = {
            email: form.email,
            username: form.username,
            password: form.password,
            name: {
                firstname: form.firstname,
                lastname: form.lastname,
            },
            address: {
                city: 'Seoul',
                street: 'Test St',
                number: 123,
                zipcode: '00000',
                geolocation: {
                    lat: '0',
                    long: '0',
                },
            },
            phone: form.phone,
        };
        await memberUser(user,navigate);
        console.log(user)
    };

    return (
        <div className="container">
            <div className="content-inner">
                <Title title="회원가입" subTitle="회원에 가입하시면 더 많은 혜택을 받으실수 있습니다" />
                <form className="user-form" onSubmit={handleSubmit}>
                    <input name="email" placeholder="이메일" value={form.email} onChange={onChange} required />
                    <input name="username" placeholder="아이디" value={form.username} onChange={onChange} required />
                    <input type="password" name="password" placeholder="비밀번호" value={form.password} onChange={onChange} required />
                    <input name="firstname" placeholder="이름(성)" value={form.firstname} onChange={onChange} required />
                    <input name="lastname" placeholder="이름(이름)" value={form.lastname} onChange={onChange} required />

                    <input name="phone" placeholder="전화번호" value={form.phone} onChange={onChange} required />
                    <button className="black-btn" type="submit">회원가입</button>
                </form>
            </div></div>
    );
};

export default Signup;
