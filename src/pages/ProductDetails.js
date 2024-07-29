import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/slices/cartSlice';

const ProductDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const product = useSelector((state) =>
    state.products.items.find((item) => item.ProductID === parseInt(id))
  );

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <Container className="my-5">
      <Row>
        <Col md={6}>
          <img src={product.ImagePath} alt={product.Name} style={{ width: '100%' }} />
        </Col>
        <Col md={6}>
          <h2>{product.Name}</h2>
          <p>{product.Description}</p>
          <h3>${product.Price}</h3>
          <Button onClick={handleAddToCart}>Add to Cart</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ProductDetails;
