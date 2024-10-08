import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Card,
} from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import PaypalSubscriptionButton from './PaypalSubscriptionButton';
import { clearCart } from '../redux/slices/cartSlice';
import banner_checkout from '../compoments/images/image 104.png';
import '../style/Checkout.css';
import checkMark from '../compoments/images/Check Mark.png';
import { useToast } from '../hooks/useToast';
import axios from 'axios';

const CheckoutPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector(state => state.cart.cartItems);
  const [formValues, setFormValues] = useState({
    Address: '',
    City: '',
    Zip: '',
    StoreID: '',
  });
  const [user, setUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [stores, setStores] = useState([]);
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeResponse = await axios.get('http://localhost:4000/stores');
        setStores(storeResponse.data);
      } catch (err) {
        errorToast('Lỗi khi lấy thông tin cửa hàng.');
      }
    };
    fetchStores();
  }, [errorToast]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      errorToast('Vui lòng đăng nhập để tiếp tục.');
      navigate('/login');
    } else {
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
          setUser(data);
        } catch (error) {
          errorToast(`Lỗi: ${error.message}`);
          navigate('/login');
        }
      };
      fetchUserProfile();
    }
  }, [errorToast, navigate]);

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + Number(item.Price) * item.quantity,
      0,
    );
    return total.toFixed(2);
  };

  const handlePlaceOrder = async e => {
    e.preventDefault();
    setShowModal(true);
  };

  const handlePaymentMethodSelect = async method => {
    setShowModal(false);

    const orderDetails = {
      CustomerID: user?.CustomerID,
      ProductID: cartItems[0].ProductID,
      OrderDate: new Date().toISOString().split('T')[0],
      ShipDate: new Date(new Date().setDate(new Date().getDate() + 7))
        .toISOString()
        .split('T')[0],
      Status: 'Chờ Thanh Toán',
      Quantity: cartItems.reduce((total, item) => total + item.quantity, 0),
      TotalPrice: calculateTotal(),
      PaymentMethod: method === 'paypal' ? 'PayPal' : 'Thanh toán khi nhận hàng',
      Address: formValues.Address,
      City: formValues.City,
      Zip: formValues.Zip,
      StoreID: formValues.StoreID,
    };

    console.log(orderDetails); // Debugging: log the order details

    try {
      const response = await axios.post('http://localhost:4000/orders', orderDetails);

      if (response.status !== 201) {
        throw new Error('Đặt hàng thất bại.');
      }

      setOrderPlaced(true);
      setShowSuccessModal(true);
      dispatch(clearCart());
    } catch (error) {
      errorToast(`Đặt hàng thất bại: ${error.message}`);
    }
  };

  const handlePayPalSuccess = (details, data) => {
    console.log('Payment approved by PayPal:', details, data);
    dispatch(clearCart());
    setShowSuccessModal(true);
  };

  const handleChange = e => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value });
  };
  const formatNumber = (num) => {
    return num.toLocaleString('vi-VN', { minimumFractionDigits: 3, maximumFractionDigits: 3 });
  };
  return (
    <Container className="checkout-container" style={{ background: '#fff' }}>
      <div className="banner_Checkout">
        <img src={banner_checkout} alt="Checkout Banner" className="img-fluid" />
      </div>

      <h1 className="checkout-title">Thanh Toán</h1>

      {orderPlaced ? (
        <div className="order-success">
          <div>
            <p>Đặt hàng thành công! Cảm ơn bạn đã mua hàng.</p>
            <img src={checkMark} className="checlMask" />
          </div>
        </div>
      ) : cartItems.length === 0 ? (
        <p className="empty-cart-message">Giỏ hàng của bạn đang trống</p>
      ) : (
        <>
          <Row className="mb-4">
            <Col md={8}>
              <h4 style={{ padding: '20px 0' }}>Địa chỉ giao hàng</h4>
              <Form onSubmit={handlePlaceOrder}>
                <Form.Group controlId="formStoreID">
                  <Form.Label style={{ fontWeight: '600' }}>Cửa Hàng</Form.Label>
                  <Form.Control
                    as="select"
                    name="StoreID"
                    value={formValues.StoreID}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Chọn Cửa Hàng</option>
                    {stores.map(store => (
                      <option key={store.StoreID} value={store.StoreID}>
                        {store.StoreName}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
                    Địa chỉ
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập địa chỉ"
                    name="Address"
                    value={formValues.Address}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicCity">
                  <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
                    Thành phố
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập thành phố"
                    name="City"
                    value={formValues.City}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicZip">
                  <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
                    Mã ZIP
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Nhập mã ZIP"
                    name="Zip"
                    value={formValues.Zip}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
                <button
                  variant="custom"
                  type="submit"
                  className="w-100"
                  style={{ background: '#73262C', color: '#fff' }}
                >
                  Đặt hàng
                </button>
              </Form>
            </Col>
            <Col md={4} style={{ background: '#fff' }}>
              <div className="cart-box">
                <h4 className="text-center mb-3">Giỏ hàng của bạn</h4>
                {cartItems.map(item => (
                  <Card key={item.ProductID} className="cart-item-card mb-3">
                    <Card.Body style={{ background: '#fff' }}>
                      <Card.Title>{item.Name}</Card.Title>
                      <hr />
                      <Card.Text>
                        <strong>Số lượng:</strong> {item.quantity}
                      </Card.Text>
                      <hr />
                      <Card.Text>
                        <strong>Giá:</strong> {formatNumber(item.Price * item.quantity)} VND
                      </Card.Text>
                    </Card.Body>
                  </Card>
                ))}
                <div className="total-price text-center mt-3">
                  <h5>Tổng cộng: ${calculateTotal()}</h5>
                </div>
              </div>
            </Col>
          </Row>
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton>
              <Modal.Title>Chọn phương thức thanh toán</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                <Col xs={6}>
                  <Button
                    variant="custom"
                    onClick={() => handlePaymentMethodSelect('creditCard')}
                    className="w-100 payment-button"
                    style={{ background: '#73262C', color: '#fff' }}
                  >
                    Thanh toán khi nhận hàng
                  </Button>
                </Col>
                <Col xs={6} className="d-flex justify-content-end">
                  <div className="paypal-button-container">
                    <PaypalSubscriptionButton onSuccess={handlePayPalSuccess} />
                  </div>
                </Col>
              </Row>
            </Modal.Body>
          </Modal>
          {/* Success Modal */}
          <Modal
            show={showSuccessModal}
            onHide={() => setShowSuccessModal(false)}
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title>Đơn Hàng Của Bạn Đã Đặt Thành Công</Modal.Title>
            </Modal.Header>
            <Modal.Body className="text-center">
              <h5>Chúng tôi sẽ giao hàng cho bạn trong ngày hôm nay.</h5>
              <Button
                variant="custom"
                onClick={() => setShowSuccessModal(false)}
                style={{ background: '#73262C', color: '#fff' }}
              >
                Đóng
              </Button>
            </Modal.Body>
          </Modal>
        </>
      )}
    </Container>
  );
};

export default CheckoutPage;
