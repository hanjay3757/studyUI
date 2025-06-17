import React, { useState } from 'react';
import { useCartStore } from '../store/useCartStore';
import Title from '../components/Title';
import './form.scss';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const login = useCartStore((state) => state.login);
  const navigate=useNavigate();

  const [form, setForm] = useState({
    email: '',
    password: '',
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await login({ email: form.email, password: form.password },navigate);
    setForm({
      email: '',
      password: '',
    });
  };

  return (
    <div className="container">
      <div className="content-inner">
        <Title title="로그인" subTitle="로그인하시면 더 다양한 혜택을 받을실수 있습니다" />
        <form className="user-form" onSubmit={handleSubmit}>
          <input
            name="email"
            placeholder="이메일"
            value={form.email}
            onChange={onChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="비밀번호"
            value={form.password}
            onChange={onChange}
            required
          />
          <button className="black-btn" type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
