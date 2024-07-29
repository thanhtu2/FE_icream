import React, { useState } from 'react';
import axios from 'axios';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import ProductCard from './ProductCard';

const Search = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Gọi API với tham số tìm kiếm
      const response = await axios.get(`http://localhost:4000/search`, {
        params: { search: query }
      });
      setResults(response.data);
    } catch (error) {
      setError('Error fetching products');
    }

    setLoading(false);
  };

  return (
    <Container>
      <Row>
        <Col md={12} className="my-4">
          <Form onSubmit={handleSearch}>
            <Form.Group controlId="searchQuery">
              <Form.Control
                type="text"
                placeholder="Search for products"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="mt-2">
              Search
            </Button>
          </Form>
          {loading && <p>Loading...</p>}
          {error && <p className="text-danger">{error}</p>}
        </Col>
      </Row>
      <Row className="my-4">
        {results.length > 0 ? (
          results.map(product => (
            <Col key={product.ProductID} sm={12} md={6} lg={4} xl={3}>
              <ProductCard product={product} />
            </Col>
          ))
        ) : (
          <Col>
            <p>No products found.</p>
          </Col>
        )}
      </Row>
    </Container>
  );
};

export default Search;
