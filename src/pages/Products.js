import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from 'axios';
import ProductCard from '../compoments/ProductCard';
import '../style/Product.css'

const Products = () => {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  useEffect(() => {
    axios.get('http://localhost:4000/products/')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(products.length / productsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <Container fluid className="px-3">
      <h1 className="text-center my-4">Our Products</h1>
      <div className="d-flex flex-column flex-md-row text-center">
        <div className='C-L mb-4 mb-md-0' style={{ width: '100%', maxWidth: '200px', margin: '' }}>
          <ul className="list-unstyled">
            <li className="py-2">
              <a href='/products?category=1'>Kem ốc quế</a>
            </li>
            <li className="py-2">
              <a href='/products?category=2'>Kem que</a>
            </li>
            <li className="py-2">
              <a href='/products?category=3'>Kem Mochi</a>
            </li>
            <li className="py-2">
              <a href='/products?category=4'>Kem hộp 85g</a>
            </li>
            <li className="py-2">
              <a href='/products?category=5'>Kem hộp 450g</a>
            </li>
            <li className="py-2">
              <a href='/products?category=6'>Kem tươi</a>
            </li>
          </ul>
        </div>
        <div className='C-R' style={{ width: '100%' }}>
          <Row className="g-4">
            {currentProducts.map((product) => (
              <Col key={product.ProductID} xs={12} sm={6} md={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <div className="pagination-controls d-flex justify-content-center align-items-center mt-4">
            <Button onClick={handlePreviousPage} disabled={currentPage === 1} className="mx-2">Previous</Button>
            <span>Page {currentPage} of {Math.ceil(products.length / productsPerPage)}</span>
            <Button onClick={handleNextPage} disabled={currentPage === Math.ceil(products.length / productsPerPage)} className="mx-2">Next</Button>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default Products;
