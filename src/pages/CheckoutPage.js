// src/pages/CheckoutPage.js
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { clearCart } from '../redux/slices/cartSlice';
import { placeOrder, clearOrder } from '../redux/slices/orderSlice';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const user = useSelector((state) => state.user);
  const orderStatus = useSelector((state) => state.order.status);
  const orderError = useSelector((state) => state.order.error);
  const order = useSelector((state) => state.order.order);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formValues, setFormValues] = useState({
    email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [orderPlaced, setOrderPlaced] = useState(false); // Định nghĩa trạng thái orderPlaced và setOrderPlaced

  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => total + Number(item.Price) * item.quantity, 0);
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(total);
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePaymentMethodSelect = async (method) => {
    if (!user) {
      toast.error('Đang tải thông tin người dùng. Vui lòng đợi.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    if (!user.CustomerID) {
      toast.error('Thông tin người dùng không hợp lệ. Vui lòng đăng nhập lại.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    setPaymentMethod(method);
    setShowModal(false);

    const customerId = user.CustomerID;

    const orderItems = cartItems.map(item => ({
      ProductID: item.ProductID,
      Quantity: item.quantity,
      TotalPrice: (Number(item.Price) * item.quantity).toFixed(2),
    }));

    const orderDetails = {
      CustomerID: customerId,
      OrderDate: new Date().toISOString().split('T')[0],
      ShipDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      Status: 'Pending',
      Quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      TotalPrice: calculateTotal(),
      PaymentMethod: method,
      Items: orderItems,
    };

    try {
      await dispatch(placeOrder(orderDetails)).unwrap();
      dispatch(clearCart());
      setOrderPlaced(true); // Cập nhật trạng thái orderPlaced sau khi đặt hàng thành công
    } catch (error) {
      console.error("Đặt hàng thất bại: ", error.message);
      toast.error(`Đặt hàng thất bại: ${error.message}`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };

  return (
    <Container>
      <ToastContainer />
      <h1>Checkout</h1>
      {orderPlaced ? (
        <div>
          <p>Đặt hàng thành công! Cảm ơn bạn đã mua hàng.</p>
          <p>Mã đơn hàng: {order.OrderID}</p>
          <p>Ngày đặt hàng: {order.OrderDate}</p>
          <p>Tổng giá trị: {order.TotalPrice}</p>
        </div>
      ) : (
        cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <>
            <Row className="mb-3">
              <Col md={8}>
                <h4>Shipping Address</h4>
                <Form onSubmit={handlePlaceOrder}>
                  <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Enter email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter address"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter city"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicZip">
                    <Form.Label>Zip Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter zip code"
                      name="zip"
                      value={formValues.zip}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Place Order
                  </Button>
                </Form>
              </Col>
              <Col md={4}>
                <h4>Order Summary</h4>
                <ul>
                  {cartItems.map(item => (
                    <li key={item.ProductID}>
                      {item.Name} - {item.quantity} x ${Number(item.Price).toFixed(2)}
                    </li>
                  ))}
                </ul>
                <h4>Total: {calculateTotal()}</h4>
              </Col>
            </Row>

            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Button variant="primary" className="mb-3" onClick={() => handlePaymentMethodSelect('Credit Card')}>
                  Thanh toán qua thẻ tín dụng
                </Button>
                <Button variant="secondary" onClick={() => handlePaymentMethodSelect('Cash')}>
                  Thanh toán khi nhận hàng
                </Button>
              </Modal.Body>
            </Modal>
          </>
        )
      )}
      {orderStatus === 'failed' && <p style={{ color: 'red' }}>Đặt hàng thất bại: {orderError}</p>}
    </Container>
  );
};

export default CheckoutPage;
