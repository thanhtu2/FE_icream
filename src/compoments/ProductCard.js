// src/components/ProductCard.js
import React, { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';
import { toast } from 'react-toastify';
import '../style/ProductCard.css';

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const { user, token } = useSelector((state) => state.auth); // Lấy thông tin người dùng và token từ Redux

  const handleAddToCart = () => {
    if (user && token) {
      dispatch(addToCart(product));
      toast.success(`${product.Name} đã được thêm vào giỏ hàng`, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.warn('Bạn cần đăng nhập để thêm sản phẩm vào giỏ hàng.', {
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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Card className="product-card">
        <Card.Img variant="top" src={product.ImagePath} />
        <Card.Body>
          <Card.Title>{product.Name}</Card.Title>
          <Card.Text>{product.Description}</Card.Text>
          <Card.Text>{product.Price} VND</Card.Text>
          <Button variant="primary" onClick={handleAddToCart}>Add to Cart</Button>
          <Button variant="secondary" onClick={handleShow} className="ms-2">Xem Chi Tiết</Button>
        </Card.Body>
      </Card>

      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>{product.Name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={product.ImagePath} alt={product.Name} className="modal-img" />
          <p><strong>Description:</strong> {product.Description}</p>
          <p><strong>Price:</strong> {product.Price} VND</p>
          <p><strong>Stock:</strong> {product.Stock} units</p>
          <p><strong>CategoryID:</strong> {product.CategoryID}</p>
          <p><strong>ProductID:</strong> {product.ProductID}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={() => { handleAddToCart(); handleClose(); }}>
            Add to Cart
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProductCard;
