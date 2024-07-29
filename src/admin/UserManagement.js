// src/components/UserManagement.js
import React, { useEffect, useState } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../style/UserManagement.css'; // Import tệp CSS tùy chỉnh
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(''); // Thêm trạng thái thành công
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setUsers(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin người dùng.');
      }
    };

    fetchUsers();
  }, []);

  const handleHideUser = async (userId) => {
    try {
      await axios.patch(`http://localhost:4000/users/${userId}/hide`);
      setUsers(users.map(user => user.CustomerID === userId ? { ...user, IsActive: false } : user));
      setSuccess('Người dùng đã được ẩn thành công.'); // Cập nhật thông báo thành công
    } catch (err) {
      setError('Lỗi khi ẩn người dùng.');
    }
    toast.success('Ẩn thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

  };

  const handleEditUser = (userId) => {
    navigate(`/admin/users/${userId}/edit`);
  };

  return (
    <div>
      <h2>Danh sách người dùng</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {success && <Alert variant="success">{success}</Alert>} {/* Hiển thị thông báo thành công */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên</th>
            <th>Email</th>
            <th>Địa chỉ</th>
            <th>Vai trò</th>
            <th>Hoạt động</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.CustomerID} className={user.IsActive ? '' : 'hidden-user'}>
              <td>{user.CustomerID}</td>
              <td>{`${user.FirstName} ${user.LastName}`}</td>
              <td>{user.Email}</td>
              <td>{user.Address}</td>
              <td>{user.Role}</td>
              <td>{user.IsActive ? 'Đang hoạt động' : 'Đã ẩn'}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditUser(user.CustomerID)}>Sửa</Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => handleHideUser(user.CustomerID)}>Ẩn</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
