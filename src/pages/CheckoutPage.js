import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Container, Row, Col, Button, Form, Modal } from 'react-bootstrap';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import PaypalSubscriptionButton from './PaypalSubscriptionButton';
import { clearCart } from '../redux/slices/cartSlice';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [formValues, setFormValues] = useState({
    // email: '',
    address: '',
    city: '',
    zip: '',
  });
  const [user, setUser] = useState(null); // Thêm state để lưu trữ thông tin người dùng
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      toast.error('Vui lòng đăng nhập để tiếp tục.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/login');
    } else {
      // Gọi API để lấy thông tin người dùng
      const fetchUserProfile = async () => {
        try {
          const response = await fetch('http://localhost:4000/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (!response.ok) {
            throw new Error('Không thể lấy thông tin người dùng.');
          }
          const data = await response.json();
          setUser(data); // Lưu thông tin người dùng vào state
        } catch (error) {
          toast.error(`Lỗi: ${error.message}`, {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          navigate('/login');
        }
      };
      fetchUserProfile();
    }
  }, [navigate]);

  const calculateTotal = () => {
    const total = cartItems.reduce((total, item) => total + Number(item.Price) * item.quantity, 0);
    return total.toFixed(2);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePaymentMethodSelect = async (method) => {
    if (method === 'paypal') {
      return;
    }

    setShowModal(false);

    const orderDetails = {
      CustomerID: user?.CustomerID, // Sử dụng CustomerID từ state user
      ProductID: cartItems[0].ProductID, 
      OrderDate: new Date().toISOString().split('T')[0],
      ShipDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0],
      Status: 'sắp giao',
      Quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      TotalPrice: calculateTotal(),
      PaymentStatus:'Thanh toán khi nhận hàng',
      // Email: formValues.email,
      Address: formValues.address,
      City: formValues.city,
      Zip: formValues.zip,
    };

    try {
      const response = await fetch('http://localhost:4000/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderDetails),
      });

      if (!response.ok) {
        throw new Error('Đặt hàng thất bại.');
      }

      const data = await response.json();
      setOrderPlaced(true);
      toast.success('Đặt hàng thành công!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      dispatch(clearCart());
      
    } catch (error) {
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

  const handlePayPalSuccess = (details, data) => {
    console.log("Payment approved by PayPal:", details, data);
    dispatch(clearCart()); 
    toast.success('Thanh toán thành công!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
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
        </div>
      ) : (
        cartItems.length === 0 ? (
          <p>Giỏ hàng của bạn đang trống</p>
        ) : (
          <>
            <Row className="mb-3">
              <Col md={8}>
                <h4>Địa chỉ giao hàng</h4>
                <Form onSubmit={handlePlaceOrder}>
                  {/* <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="Nhập email"
                      name="email"
                      value={formValues.email}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group> */}
                  <Form.Group className="mb-3" controlId="formBasicAddress">
                    <Form.Label>Địa chỉ</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập địa chỉ"
                      name="address"
                      value={formValues.address}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicCity">
                    <Form.Label>Thành phố</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập thành phố"
                      name="city"
                      value={formValues.city}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="formBasicZip">
                    <Form.Label>Mã ZIP</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Nhập mã ZIP"
                      name="zip"
                      value={formValues.zip}
                      onChange={handleChange}
                      required
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Đặt hàng
                  </Button>
                </Form>
              </Col>
              <Col md={4}>
                <h4>Giỏ hàng của bạn</h4>
                <ul>
                  {cartItems.map((item) => (
                    <li key={item.ProductID}>
                      {item.Name} x {item.quantity} - ${item.Price * item.quantity}
                    </li>
                  ))}
                </ul>
                <h5>Tổng cộng: ${calculateTotal()}</h5>
              </Col>
            </Row>
            <Modal show={showModal} onHide={() => setShowModal(false)}>
              <Modal.Header closeButton>
                <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col xs={6} md={6} lg={6}>
                    <Button variant="primary" onClick={() => handlePaymentMethodSelect('creditCard')} style={{ width: '100%' }}>
                      Thanh toán khi nhận hàng
                    </Button>
                  </Col>
                  <Col xs={6} md={6} lg={6} className="d-flex justify-content-end">
                    <div style={{ width: '100%' }}>
                      <PaypalSubscriptionButton onSuccess={handlePayPalSuccess} />
                    </div>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal>
          </>
        )
      )}
    </Container>
  );
};

export default CheckoutPage;
