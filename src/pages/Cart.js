
import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  Container,
  Row,
  Col,
  Button,
  InputGroup,
  FormControl,
} from 'react-bootstrap';
import { removeFromCart, updateQuantity,updateDiscount } from '../redux/slices/cartSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Cart = () => {
  const cartItems = useSelector(state => state.cart.cartItems);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [discount, setDiscount] = useState(null);

  const handleRemoveFromCart = ProductID => {
    dispatch(removeFromCart(ProductID));
  };

  const handleQuantityChange = (ProductID, quantity) => {
    dispatch(updateQuantity({ ProductID, quantity }));
  };

  const handleAddDiscount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/discounts/${discount}`,
      );
    const isExistProduct = cartItems.find(item => item.ProductID === response.data.ProductID);
    console.log(cartItems,response.data.ProductID,isExistProduct)
    if(isExistProduct){  
      dispatch(updateDiscount(response.data));
      toast.success('ap ma giam gia thanh cong.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }else{
      toast.error('ap ma giam gia thanh cong ma giam gia khong su dung duoc voi cac san pham nay.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
     
    }
    } catch (err) {
      toast.error('Mã giảm giá không tồn tại.', {
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

  const calculateTotal = () => {
    const total = cartItems.reduce(
      (total, item) => total + Number(item.Price) * item.quantity,
      0,
    );
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(total);
  };

  return (
    <Container>
      <h1>Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          {cartItems.map(item => (
            <Row key={item.ProductID} className="mb-3">
              <Col md={4}>
                <img
                  src={item.ImagePath}
                  alt={item.Name}
                  style={{ width: '100%' }}
                />
              </Col>
              <Col md={4}>
                <h5>{item.Name}</h5>
                <p>{item.Description}</p>
                <h6>
                  $
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(item.Price))}
                </h6>
                <InputGroup>
                  <InputGroup.Text>Quantity</InputGroup.Text>
                  <FormControl
                    type="number"
                    value={item.quantity}
                    onChange={e =>
                      handleQuantityChange(
                        item.ProductID,
                        parseInt(e.target.value),
                      )
                    }
                  />
                </InputGroup>
                <InputGroup>
                  <InputGroup.Text>Discount</InputGroup.Text>
                  <FormControl
                    type="string"
                    value={discount}
                    onChange={e => setDiscount(e.target.value)}
                  />
                </InputGroup>
                <Button
                  variant="danger"
                  onClick={() => handleAddDiscount()}
                  className="mt-2"
                  disabled={
                discount === null
                  }
                >
                  Add
                </Button>
                <Button
                  variant="danger"
                  onClick={() => handleRemoveFromCart(item.ProductID)}
                  className="mt-2"
                >
                  Remove
                </Button>
              </Col>
              <Col md={4} className="d-flex align-items-center">
                <h6>
                  Subtotal: $
                  {new Intl.NumberFormat('en-US', {
                    style: 'currency',
                    currency: 'USD',
                  }).format(Number(item.Price) * item.quantity)}
                </h6>
              </Col>
            </Row>
          ))}
          <Row className="mt-3">
            <Col>
              <h4>Total: {calculateTotal()}</h4>
              <Button
                variant="success"
                size="lg"
                onClick={() => navigate('/checkout')}
              >
                Proceed to Checkout
              </Button>
            </Col>
          </Row>
        </>
      )}
    </Container>
  );
};

export default Cart;
