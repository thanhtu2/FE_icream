import React from 'react';
import { Container, Row, Col, Carousel, Image, Button } from 'react-bootstrap';
import ProductList from '../compoments/ProductList';
import { Link } from 'react-router-dom'; // Thêm import Link
import '../style/home.css';

const Home = () => {
  return (
    <>
      <Carousel>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/images/image 57.png`}
            alt="First slide"
          />
          <Carousel.Caption>
            <h3>First Slide</h3>
            <p>First slide description</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/images/image 60.png`}
            alt="Second slide"
          />
          <Carousel.Caption>
            <h3>Second Slide</h3>
            <p>Second slide description</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100"
            src={`${process.env.PUBLIC_URL}/images/image 63.png`}
            alt="Third slide"
          />
          <Carousel.Caption>
            <h3>Third Slide</h3>
            <p>Third slide description</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
      <Container className="my-4">
        <Row>
          <Col>
            <h2>Our Products</h2>
            <ProductList />
          </Col>
        </Row>
       
        
        <Row className="promotion-container my-4">
          <Col md={6}>
            <Image src={`${process.env.PUBLIC_URL}/images/image 62.png`} fluid />
          </Col>
          <Col md={6} className="promotion-text">
            <h1>Exciting Promotions</h1>
            <p>Check out our latest offers and discounts on a wide range of products. Don’t miss out!</p>
            <Link to="/promotion">
              <Button variant="primary">See Promotions</Button>
            </Link>
          </Col>
        </Row>
        <Row className="promotion-container my-4">
          <Col md={6}>
            <Image src={`${process.env.PUBLIC_URL}/images/image 62.png`} fluid />
          </Col>
          <Col md={6} className="promotion-text">
            <h1>Exciting Promotions</h1>
            <p>Check out our latest offers and discounts on a wide range of products. Don’t miss out!</p>
            <Link to="/promotion">
              <Button variant="primary">See Promotions</Button>
            </Link>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
