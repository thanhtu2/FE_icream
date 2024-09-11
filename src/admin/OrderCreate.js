import React, { useState, useEffect } from 'react';
import { Form, Button, Container, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../style/oderCreate.css';

const OrderCreate = () => {
  const [order, setOrder] = useState({
    CustomerID: '',
    ProductID: '',
    Quantity: '',
    TotalPrice: '',
    OrderDate: '',
    ShipDate: '',
    Status: '',
    StoreID: '',
  });
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [stores, setStores] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users'); // Lấy danh sách khách hàng
        setCustomers(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin khách hàng.');
      }
    };

    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:4000/products'); // Lấy danh sách sản phẩm
        setProducts(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin sản phẩm.');
      }
    };

    const fetchStores = async () => {
      try {
        const storeResponse = await axios.get(
          `${process.env.REACT_APP_API}/stores`,
        );
        setStores(storeResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin cửa hàng.');
      }
    };

    fetchStores();
    fetchCustomers();
    fetchProducts();
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/orders', order);
      toast.success('Tạo đơn hàng mới thành công.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      setOrder({
        CustomerID: '',
        ProductID: '',
        Quantity: '',
        TotalPrice: '',
        OrderDate: '',
        ShipDate: '',
        Status: '',
        StoreID: '',
      });
      navigate('/admin/orders'); // Chuyển hướng đến trang quản lý đơn hàng sau khi tạo thành công
    } catch (err) {
      toast.error('Lỗi khi tạo đơn hàng mới.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleBackToList = () => {
    navigate('/admin/orders'); // Chuyển hướng đến trang quản lý đơn hàng
  };

  const getCustomerName = customerId => {
    const customer = customers.find(cust => cust.CustomerID === customerId);
    return customer
      ? `${customer.FirstName} ${customer.LastName}`
      : 'Chưa xác định';
  };

  const getProductName = productId => {
    const product = products.find(prod => prod.ProductID === productId);
    return product ? product.Name : 'Chưa xác định';
  };

  return (
    <Container style={{ marginTop: '20px', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px 0' }}>
        Tạo Đơn Hàng Mới
      </h1>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomerID">
          <Form.Label style={{ fontWeight: '600' }}>Khách Hàng</Form.Label>
          <Form.Control
            as="select"
            name="CustomerID"
            value={order.CustomerID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Khách Hàng</option>
            {customers.map(customer => (
              <option key={customer.CustomerID} value={customer.CustomerID}>
                {`${customer.FirstName} ${customer.LastName}`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStoreID">
          <Form.Label style={{ fontWeight: '600' }}>Cửa Hàng</Form.Label>
          <Form.Control
            as="select"
            name="StoreID"
            value={order.StoreID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Cửa Hàng</option>
            {stores.map(store => (
              <option key={store.StoreID} value={store.StoreID}>
                {store.Name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formProductID">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Sản Phẩm
          </Form.Label>
          <Form.Control
            as="select"
            name="ProductID"
            value={order.ProductID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Sản Phẩm</option>
            {products.map(product => (
              <option key={product.ProductID} value={product.ProductID}>
                {product.Name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formQuantity">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Quantity
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
            Total Price
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
            {' '}
            Order Date
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
            Ship Date
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
            Status
          </Form.Label>
          <Form.Control
            type="text"
            name="Status"
            value={order.Status}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          variant="primary"
          className="btn-createproduct"
          type="submit"
          style={{ marginTop: '20px' }}
        >
          Tạo Đơn Hàng
        </Button>
        <Button
          className="btn-prevlistproduct"
          variant="secondary"
          onClick={handleBackToList}
          style={{ marginLeft: '10px' }}
        >
          Quay Lại Danh Sách Đơn Hàng
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default OrderCreate;
