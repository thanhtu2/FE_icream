import React from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '../style/contact.css'; // Thêm CSS nếu cần
const Contact = () => {
  return (
    <Container>
      <h1>Contact Us</h1>
      <Form>
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email" />
        </Form.Group>

        <Form.Group controlId="formBasicMessage">
          <Form.Label>Message</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter your message" />
        </Form.Group>
      <br/>
        <Button variant="" className='btn-submit-contact' type="submit" style={{ background:'rgb(115,38,44)', color:'white' }}>
          Submit
        </Button>
      </Form>

      <h2 style={{padding:"10px 0",textAlign:"center"}}>Our Location</h2>
      <div className="map-container" style={{ marginTop: '20px' }}>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m10!1m8!1m3!1d251637.95196238213!2d105.6189045!3d9.779349!3m2!1i1024!2i768!4f13.1!5e0!3m2!1svi!2s!4v1722192905664!5m2!1svi!2s"
          width="100%"
          height="500"
          style={{ border: '0' }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Google Maps"
        />
      </div>
    </Container>
  );
};

export default Contact;
