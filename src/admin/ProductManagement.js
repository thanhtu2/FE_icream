import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/ProductManagement.css';

const ProductManagement = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productResponse = await axios.get(
          'http://localhost:4000/products',
        );
        setProducts(productResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin sản phẩm.');
      }
    };

    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get(
          'http://localhost:4000/categories',
        );
        setCategories(categoryResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin danh mục.');
      }
    };

    fetchProducts();
    fetchCategories();
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredProducts = products.filter(product =>
    product.Name.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleEditProduct = productId => {
    navigate(`/admin/products/${productId}/edit`);
  };

  const handleDeleteProduct = async productId => {
    try {
      await axios.delete(`http://localhost:4000/products/${productId}`);
      setProducts(products.filter(product => product.ProductID !== productId));
      toast.success('Xóa sản phẩm thành công.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (err) {
      toast.error('Lỗi khi xóa sản phẩm.', {
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

  // Tìm tên danh mục dựa trên CategoryID
  const getCategoryName = categoryId => {
    const category = categories.find(cat => cat.CategoryID === categoryId);
    return category ? category.Name : 'Chưa xác định';
  };

  return (
    <div className="productManagement" style={{ padding: '50px' }}>
      <h2 style={{ textAlign: 'center', padding: '20px 0' }}>
        Danh sách sản phẩm
      </h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Form.Control
        type="text"
        placeholder="Tìm kiếm sản phẩm"
        value={searchTerm}
        onChange={handleSearch}
        style={{ marginBottom: '20px' }}
      />
      <Button
        variant="success"
        className="btn-addproductnew"
        onClick={() => navigate('/admin/products/create')}
        style={{ marginBottom: '20px' }}
      >
        Thêm Sản Phẩm Mới
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Sản Phẩm</th>
            <th>Giá</th>
            <th>Danh Mục</th>
            <th>Kho</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredProducts.map(product => (
            <tr key={product.ProductID}>
              <td>{product.ProductID}</td>
              <td>{product.Name}</td>
              <td>{product.Price}</td>
              <td>{getCategoryName(product.CategoryID)}</td>
              <td>{product.Stock}</td>
              <td>
                <Button
                  className="btn-suaproductmana"
                  variant="warning"
                  onClick={() => handleEditProduct(product.ProductID)}
                >
                  Sửa
                </Button>
                <Button
                  className="btn-xoaproductmana"
                  variant="danger"
                  style={{ marginLeft: '10px', color: '#fff !important' }}
                  onClick={() => handleDeleteProduct(product.ProductID)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default ProductManagement;
