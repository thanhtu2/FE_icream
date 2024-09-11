import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import '../style/orderEdit.css';

const OrderEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/orders/${id}`);
        setOrder(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin đơn hàng.');
      }
    };

    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users');
        setCustomers(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin khách hàng.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products');
        setProducts(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin sản phẩm.');
      }
    };

    fetchOrder();
    fetchCustomers();
    fetchProducts();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      // Cập nhật chỉ các trường có thể thay đổi
      const { CustomerID, ProductID, ...updateData } = order;
      await axios.put(`http://localhost:4000/orders/${id}`, updateData);
      setSuccess('Cập nhật thông tin đơn hàng thành công.');
      navigate('/admin/orders'); // Chuyển hướng đến danh sách đơn hàng sau khi cập nhật
    } catch (err) {
      setError('Lỗi khi cập nhật thông tin đơn hàng.');
    }
  };

  if (!order || !customers.length || !products.length) return <p>Loading...</p>;

  // Tìm tên khách hàng và tên sản phẩm từ danh sách dựa trên ID
  const customerName = customers.find(
    customer => customer.CustomerID === order.CustomerID,
  );
  const productName = products.find(
    product => product.ProductID === order.ProductID,
  );

  return (
    <Container style={{ marginTop: '20px', padding: '50px' }}>
      <h1 style={{ textAlign: 'center' }}>Sửa Thông Tin Đơn Hàng</h1>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        {/* Hiển thị thông tin khách hàng và sản phẩm dưới dạng chỉ đọc */}
        <Form.Group controlId="formCustomerID">
          <Form.Label style={{ fontWeight: '600' }}>Khách Hàng</Form.Label>
          <Form.Control
            type="text"
            value={
              customerName
                ? `${customerName.FirstName} ${customerName.LastName}`
                : ''
            }
            readOnly
          />
        </Form.Group>
        <Form.Group controlId="formProductID">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            {' '}
            Sản Phẩm
          </Form.Label>
          <Form.Control
            type="text"
            value={productName ? productName.Name : ''}
            readOnly
          />
        </Form.Group>
        {/* Các trường có thể sửa đổi */}
        <Form.Group controlId="formQuantity">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            {' '}
            Số Lượng
          </Form.Label>
          <Form.Control
            type="number"
            name="Quantity"
            value={order.Quantity}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formTotalPrice">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Tổng Giá
          </Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="TotalPrice"
            value={order.TotalPrice}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formOrderDate">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Ngày Đặt Hàng
          </Form.Label>
          <Form.Control
            type="date"
            name="OrderDate"
            value={order.OrderDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formShipDate">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Ngày Giao Hàng
          </Form.Label>
          <Form.Control
            type="date"
            name="ShipDate"
            value={order.ShipDate}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formStatus">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Trạng Thái
          </Form.Label>
          <Form.Control
            type="text"
            name="Status"
            value={order.Status}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <button
          variant="primary"
          className="btn-capnhatorderedit"
          type="submit"
          style={{ marginTop: '20px', background: '#73262C' }}
        >
          Cập Nhật
        </button>
      </Form>
    </Container>
  );
};

export default OrderEdit;
