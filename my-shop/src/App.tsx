import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Route, Router, Routes } from "react-router-dom";
import Layout from "./pages/Layout";
import Jewelery from "./pages/Jewelery";
import Electric from "./pages/Electric";
import Notfound from "./pages/Notfound";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Cart from "./pages/Cart";
import ProductCard from "./components/ProductCard";
import Women from "./pages/Women";
import Man from "./pages/Man";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/man" element={<Man />} />
          <Route path="/women" element={<Women />} />
          <Route path="/jewelery" element={<Jewelery />} />
          <Route path="/electric" element={<Electric />} />
          <Route path="/*" element={<Notfound />} />
          <Route path="/product/:id" element={<ProductCard />} />
        </Route>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="cart" element={<Cart />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
