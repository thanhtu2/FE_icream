// src/App.js
import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { login, logout } from './redux/slices/authSlice';
import Home from './pages/Home';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ProductDetails from './pages/ProductDetails';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Footer from './compoments/Footer';
import CustomNavbar from './compoments/Navbar';
import Search from './compoments/SearchBar';
import About from './pages/About';
import Login from './compoments/Login';
import Profile from './compoments/Profile';
import Signup from './compoments/Signup';
import Admin from './admin/Admin';
import Statistics from './admin/Statistics';
import UserManagement from './admin/UserManagement';
import UserEdit from './admin/UserEdit';
import OrderCreate from './admin/OrderCreate';
import OrderManagement from './admin/OrderManagement ';
import OrderEdit from './admin/OrderEdit';
import ProductManagement from './admin/ProductManagement';
import ProductCreate from './admin/ProductCreate';
import ProductEdit from './admin/ProductEdit';
import AdminDiscounts from './admin/AdminDiscounts';
import DiscountForm from './admin/DiscountForm';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './compoments/ProtectedRoute'
import PromotionPage from './pages/PromotionPage';
import CheckoutPage from './pages/CheckoutPage';

function App() {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    if (token && !isAuthenticated) {
      axios.get('http://localhost:4000/profile', {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then(response => {
          dispatch(login({ user: response.data, token }));
        })
        .catch(error => {
          console.error('Lỗi khi khôi phục trạng thái đăng nhập:', error);
          localStorage.removeItem('token');
          dispatch(logout());
        });
    }
  }, [dispatch, isAuthenticated, token]);

  return (
    <div>
      <CustomNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/search" element={<Search />} />
        <Route path="/about" element={<About />} />
        <Route path="/Promotion" element={<PromotionPage />} />
        <Route path="/login" element={!isAuthenticated ? <Login /> : <Home />} />
        <Route path="/signup" element={!isAuthenticated ? <Signup /> : <Home />} />
        <Route path="/profile" element={<ProtectedRoute element={<Profile />} />} />
        <Route path="/admin" element={<ProtectedRoute element={<Admin />} />} />
        <Route path="/admin/statistics" element={<ProtectedRoute element={<Statistics />} />} />
        <Route path="/admin/users" element={<UserManagement />} />
        <Route path="/admin/users/:id/edit" element={<UserEdit />} />
        <Route path="/admin/orders" element={<ProtectedRoute element={<OrderManagement />} />} />
        <Route path="/admin/orders/create" element={<OrderCreate />}  />
        <Route path="/admin/orders/:id/edit" element={<OrderEdit />} />
        <Route path="/admin/products" element={<ProtectedRoute element={<ProductManagement />} />} />
        <Route path="/admin/products/create" element={<ProtectedRoute element={<ProductCreate />} />} />
        <Route path="/admin/products/:id/edit" element={<ProtectedRoute element={<ProductEdit />} />} />
        <Route path="/admin/discounts" element={<AdminDiscounts />} />
        <Route path="/discounts/new" element={<DiscountForm />} />
        <Route path="/discounts/:discountId" element={<DiscountForm />} />
        <Route path="/checkout" element={<CheckoutPage />} />

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <ToastContainer />
    </div>
  );
}

export default App;
