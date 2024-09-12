import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useParams, useNavigate } from 'react-router-dom';
import '../style/productEdit.css';

const ProductEdit = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState({
    Name: '',
    Description: '',
    Price: '',
    CategoryID: '',
    Stock: '',
    ImagePath: '',
  });
  const [categories, setCategories] = useState([]); // Thêm trạng thái để lưu danh mục

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/products/${id}`,
        );
        setProduct(response.data);
      } catch (err) {
        toast.error('Lỗi khi lấy thông tin sản phẩm.', {
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/categories');
        setCategories(response.data);
      } catch (err) {
        toast.error('Lỗi khi lấy thông tin danh mục.', {
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

    fetchProduct();
    fetchCategories();
  }, [id]);

  const handleChange = e => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:4000/products/${id}`, product);
      toast.success('Cập nhật sản phẩm thành công.', {
        position: 'top-right',
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/admin/products'); // Chuyển hướng về trang quản lý sản phẩm sau khi cập nhật
    } catch (err) {
      toast.error('Lỗi khi cập nhật sản phẩm.', {
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

  return (
    <Container style={{ marginTop: '20px', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', padding: '10px 0' }}>
        Cập nhật Sản Phẩm
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label style={{ fontWeight: '600' }}>Tên Sản Phẩm</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={product.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Mô Tả
          </Form.Label>
          <Form.Control
            type="text"
            name="Description"
            value={product.Description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Giá
          </Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            name="Price"
            value={product.Price}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formCategoryID">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Danh Mục
          </Form.Label>
          <Form.Control
            as="select"
            name="CategoryID"
            value={product.CategoryID}
            onChange={handleChange}
            required
          >
            <option value="" style={{ fontWeight: '600', margin: '10px 0' }}>
              Chọn danh mục
            </option>
            {categories.map(category => (
              <option key={category.CategoryID} value={category.CategoryID}>
                {category.Name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStock">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Kho
          </Form.Label>
          <Form.Control
            type="number"
            name="Stock"
            value={product.Stock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImagePath">
          <Form.Label style={{ fontWeight: '600', margin: '10px 0' }}>
            Đường dẫn hình ảnh
          </Form.Label>
          <Form.Control
            type="text"
            name="ImagePath"
            value={product.ImagePath}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button
          variant="primary"
          className="btn-updateproduct"
          type="submit"
          style={{ marginTop: '20px', background: '#73262C' }}
        >
          Cập Nhật Sản Phẩm
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ProductEdit;
