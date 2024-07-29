// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify'
const ProtectedRoute = ({ element }) => {
    const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

    if (!isAuthenticated) {
      toast.error('Bạn phải đăng nhập để truy cập trang này.');
      return <Navigate to="/login" />;
    }
  
    return element;
};

export default ProtectedRoute;
