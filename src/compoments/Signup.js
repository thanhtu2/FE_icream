// src/components/Signup.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [address, setAddress] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp.');
      return;
    }
  
    try {
      await axios.post('http://localhost:4000/sign-up', { 
        FirstName: firstName,
        LastName: lastName,
        Email: email,
        Password: password,
        Address: address,
        Role: role
      });
  
      // Hiển thị thông báo thành công
      toast.success('Đăng ký thành công! Bạn có thể đăng nhập ngay.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
  
      // Chuyển hướng đến trang đăng nhập sau khi đăng ký thành công
      navigate('/login');
    } catch (error) {
      console.error('Lỗi đăng ký:', error);
      setError('Đăng ký thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  };
  
  const signupBackground = {
    background: `url('/images/image 83.png') no-repeat center center/cover`,
    height: '100vh',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative'
  };

  const overlayStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    zIndex: 0
  };

  const formStyle = {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    padding: '3rem',
    borderRadius: '8px',
    boxShadow: '0 0 2px rgba(0, 0, 0, 0.2)',
    position: 'relative',
    zIndex: 1,
    width: '70%',
    maxWidth: '50%',
    margin: '0 auto'
  };

  return (
    <div style={signupBackground}>
      <div style={overlayStyle}></div>
      <Container style={formStyle}>
        <h1 style={{textAlign:'center'}}>Sign Up</h1>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicFirstName">
            <Form.Label style={{fontWeight:'600'}}>First Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter first name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicLastName">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Last Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicEmail">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicPassword">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formConfirmPassword">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </Form.Group>

          <Form.Group controlId="formBasicAddress">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Address</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="formBasicRole">
            <Form.Label style={{fontWeight:'600',margin:'10px 0'}}>Role</Form.Label>
            <Form.Control
              as="select"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user" style={{fontWeight:'600',margin:'10px 0'}}>User</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit" style={{background:'#73262C'}}>
            Sign Up
          </Button>
        </Form>

        <p className="mt-3">Đã có tài khoản? <Link to="/login">Đăng nhập ngay</Link></p>

        <ToastContainer />
      </Container>
    </div>
  );
};

export default Signup;