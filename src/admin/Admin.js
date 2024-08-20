import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import Statistics from './Statistics';
import '../style/admin.css';

const Admin = () => {
  return (
    <Container fluid className="admin-container">
      <h1 className="admin-title">Admin Dashboard</h1>

      <Row className="g-0">
        <Col md={3} className="admin-sidebar">
          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card-title">Quản lý người dùng</Card.Title>
              <Link to="/admin/users">
                <Button variant="primary">Xem Người Dùng</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card-title">Quản lý đơn hàng</Card.Title>
              <Link to="/admin/orders">
                <Button variant="primary">Xem Đơn Hàng</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card-title">Quản lý khuyến mãi</Card.Title>
              <Link to="/admin/discounts">
                <Button variant="primary">Xem Khuyến Mãi</Button>
              </Link>
            </Card.Body>
          </Card>

          <Card className="admin-card">
            <Card.Body>
              <Card.Title className="admin-card-title">Quản lý sản phẩm</Card.Title>
              <Link to="/admin/products">
                <Button variant="primary">Xem Sản Phẩm</Button>
              </Link>
            </Card.Body>
          </Card>
        </Col>

        <Col md={9} className="admin-main-content">
          <Statistics />
        </Col>
      </Row>
    </Container>
  );
};

export default Admin;