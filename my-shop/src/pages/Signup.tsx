import React, { useState } from 'react'
import Title from '../components/Title'
import { useCartStore } from '../store/useStore'
import { useNavigate } from 'react-router-dom';
import "./scss/form.scss"

const Signup = () => {
  const { memberUser } = useCartStore();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    userId: "",
    userPassword: "",
    firstname: "",
    lastname: "",
    phone: ""
  })
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = {
      email: form.email,
      username: form.userId,
      password: form.userPassword,
      name: {
        firstname: form.firstname,
        lastname: form.lastname
      },
      phone: form.phone
    }
    memberUser(user, navigate);
  }
  return (
    <div className='container'>
      <div className='content-inner'>
        <Title title="회원가입" />
        <div className="form">
          <form onSubmit={handleSubmit}>
            <p><input type="text" name="email" placeholder='이메일'
              required
              onChange={handleChange} /></p>
            <p><input type="text" name="userId" placeholder='아이디를 입력하세요'
              required onChange={handleChange} /></p>
            <p><input type="password" name="userPassword" placeholder='비밀번호'
              required onChange={handleChange} /></p>
            <p><input type="text" name="firstname" placeholder='이름(성)'
              required onChange={handleChange} /></p>
            <p><input type="text" name="lastname" placeholder='이름(이름)'
              required onChange={handleChange} /></p>
            <p><input type="text" name="phone" placeholder='전화번호' required onChange={handleChange} /></p>
            <p className='btn'><button className='black-btn'
              type="submit">회원가입</button></p>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Signup
