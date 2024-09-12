// src/components/UserEdit.js
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../style/userEdit.css';

const UserEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [user, setUser] = useState({
    FirstName: '',
    LastName: '',
    Email: '',
    Address: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/users/`);
        setUser(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin người dùng.');
      }
    };
    fetchUser();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/users/${id}`, user);
      setSuccess('Cập nhật thông tin người dùng thành công.');
      navigate('/admin/users'); // Chuyển hướng đến danh sách người dùng sau khi cập nhật
    } catch (err) {
      setError('Lỗi khi cập nhật thông tin người dùng.');
    }
  };

  return (
    <Container style={{ marginTop: '20px', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px 0' }}>
        Sửa Thông Tin Người Dùng
      </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formFirstName">
          <Form.Label style={{ fontWeight: '600' }}>First Name</Form.Label>
          <Form.Control
            type="text"
            name="FirstName"
            value={user.FirstName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formLastName">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Last Name
          </Form.Label>
          <Form.Control
            type="text"
            name="LastName"
            value={user.LastName}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formEmail">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Email
          </Form.Label>
          <Form.Control
            type="email"
            name="Email"
            value={user.Email}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formAddress">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Address
          </Form.Label>
          <Form.Control
            type="text"
            name="Address"
            value={user.Address}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <button className="btn-capnhat" variant="primary" type="submit">
          Cập Nhật
        </button>
      </Form>
    </Container>
  );
};

export default UserEdit;
