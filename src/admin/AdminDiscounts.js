import React, { useEffect, useState } from 'react';
import { Container, Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/AdminDiscounts1.css';

const AdminDiscounts = () => {
  const [discounts, setDiscounts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Lấy danh sách mã giảm giá từ API
    const fetchDiscounts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/discounts');
        setDiscounts(response.data);
      } catch (error) {
        console.error(
          'Lỗi khi lấy danh sách mã giảm giá:',
          error.response?.data || error.message,
        );
        toast.error('Lỗi khi lấy danh sách mã giảm giá.');
      }
    };

    fetchDiscounts();
  }, []);

  const handleEdit = discountId => {
    navigate(`/discounts/${discountId}`);
  };

  const handleDelete = async discountId => {
    if (window.confirm('Bạn có chắc chắn muốn xóa mã giảm giá này?')) {
      try {
        await axios.delete(`http://localhost:4000/discounts/${discountId}`);
        setDiscounts(
          discounts.filter(discount => discount.DiscountID !== discountId),
        );
        toast.success('Xóa mã giảm giá thành công.');
      } catch (error) {
        console.error(
          'Lỗi khi xóa mã giảm giá:',
          error.response?.data || error.message,
        );
        toast.error('Lỗi khi xóa mã giảm giá.');
      }
    }
  };

  return (
    <Container style={{ padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Discount List</h1>
      <button
        className="btn-adddiscount"
        onClick={() => navigate('/discounts/new')}
        style={{ marginBottom: '20px', background: '#73262C' }}
      >
        Thêm Mã Giảm Giá
      </button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Description</th>
            <th>Discount Percent</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {discounts.map(discount => (
            <tr key={discount.DiscountID}>
              <td>{discount.DiscountID}</td>
              <td>{discount.Title}</td>
              <td>{discount.Description}</td>
              <td>{discount.DiscountPercent}%</td>
              <td>{new Date(discount.StartDate).toLocaleDateString()}</td>
              <td>{new Date(discount.EndDate).toLocaleDateString()}</td>
              <td>
                <Button
                  className="btn-suadiscount"
                  variant="warning"
                  onClick={() => handleEdit(discount.DiscountID)}
                >
                  Sửa
                </Button>{' '}
                <Button
                  className="btn-xoadiscount"
                  variant="danger"
                  onClick={() => handleDelete(discount.DiscountID)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </Container>
  );
};

export default AdminDiscounts;
