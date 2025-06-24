import React, { useState } from 'react'
import Title from '../components/Title'
import { useCartStore } from '../store/useStore'
import "./scss/form.scss"
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const { login } = useCartStore();
  const navigate=useNavigate();
  const [form, setForm] = useState({
    email: "",
    password: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: form.email,
      password: form.password
    }
    login(user,navigate);
  }
  return (
    <div className='container'>
      <div className='content-inner'>
        <Title title="로그인" />
        <form className='form' onSubmit={handleSubmit}>
          <p><input type="text" name="email"
            required
            onChange={handleChange} /></p>
          <p><input type="text"
            name="password"
            required
            onChange={handleChange} /></p>
          <p className='btn'>
            <button className='black-btn' type="submit">로그인</button>
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login
