import './App.css';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './pages/Layout';
import Home from './pages/Home';

import Login from './pages/Login';
import Cart from './pages/Cart';
import Women from './pages/Women';
import Man from './pages/Man';
import ProductDetail from './pages/ProductDetail';
import Jewelery from './pages/Jewelery';
import Electric from './pages/Electric';
import Signup from './pages/Signup';
import Member from './pages/Member';
import NotFound from './pages/NotFound';

function App() {
  return (
    <>

      <Header />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/products/:id" element={<ProductDetail />} />
          <Route path="/man" element={<Man />} />
          <Route path="/women" element={<Women />} />
          <Route path="/jewelery" element={<Jewelery />} />
          <Route path="/electronics" element={<Electric />} />
          <Route path="*" element={<NotFound />} />

          <Route path="/login" element={<Login />} />
          <Route path="/member" element={<Member />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/cart" element={<Cart />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
