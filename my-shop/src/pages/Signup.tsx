import React, { useState } from "react";
import Title from "../components/Title";
const Signup = () => {
  const [form, setForm] = useState({
    email: "",
    userId: "",
    userPassword: "",
    firstname: "",
    lastname: "",
    phone: "",
  });
  const handleChange = () => {};
  return (
    <div className="container">
      <Title title="회원가입" />
      <div className="form">
        <form action="">
          <p>
            <input
              type="text"
              name="email"
              placeholder="email"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <input
              type="text"
              name="userId"
              placeholder="userId"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <input
              type="pasword"
              name="userPassword"
              placeholder="비번"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <input
              type="text"
              name="firstname"
              placeholder="성"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <input
              type="text"
              name="lastname"
              placeholder="이름"
              required
              onChange={handleChange}
            />
          </p>
          <p>
            <input
              type="text"
              name="phone"
              placeholder="전화번호"
              required
              onChange={handleChange}
            />
          </p>
          <p className="btm">
            <button className="black-btn" type="submit">
              회원가입
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
