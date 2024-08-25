import React, { useState, useEffect } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';
import '../style/productCreate.css'

const ProductCreate = () => {
  const [product, setProduct] = useState({
    Name: '',
    Description: '',
    Price: '',
    CategoryID: '',
    Stock: '',
    ImagePath: ''
  });
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:4000/categories');
        console.log('Categories:', response.data); // Kiểm tra dữ liệu nhận được
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        toast.error('Lỗi khi lấy danh mục.', {
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
    fetchCategories();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/products', product);
      toast.success('Tạo sản phẩm mới thành công.', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      navigate('/admin/products');
    } catch (err) {
      console.error('Error creating product:', err);
      toast.error('Lỗi khi tạo sản phẩm mới.', {
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

  return (
    <Container style={{ marginTop: '20px', padding:"50px" }}>
      <h1 style={{textAlign:"center", padding:"20px 0"}}>Thêm Sản Phẩm Mới</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formName">
          <Form.Label style={{fontWeight:"600"}}>Tên Sản Phẩm</Form.Label>
          <Form.Control
            type="text"
            name="Name"
            value={product.Name}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDescription">
          <Form.Label style={{fontWeight:"600",marginTop:"15px"}}>Mô Tả</Form.Label>
          <Form.Control
            type="text"
            name="Description"
            value={product.Description}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formPrice">
          <Form.Label style={{fontWeight:"600",marginTop:"15px"}}>Giá</Form.Label>
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
          <Form.Label style={{fontWeight:"600",marginTop:"15px"}}>Danh Mục</Form.Label>
          <Form.Control
            as="select"
            name="CategoryID"
            value={product.CategoryID}
            onChange={handleChange}
            required
          >
            <option value="" style={{fontWeight:"600",marginTop:"15px"}}>Chọn danh mục</option>
            {categories.map(category => (
              <option key={category.CategoryID} value={category.CategoryID}>
                {category.Name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formStock">
          <Form.Label style={{fontWeight:"600",marginTop:"15px"}}>Kho</Form.Label>
          <Form.Control
            type="number"
            name="Stock"
            value={product.Stock}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formImagePath">
          <Form.Label style={{fontWeight:"600",marginTop:"15px"}}>Đường dẫn hình ảnh</Form.Label>
          <Form.Control
            type="text"
            name="ImagePath"
            value={product.ImagePath}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Button className='btn-addproduct' variant="primary" type="submit" style={{ marginTop: '20px',background:"#73262C"}}>
          Thêm Sản Phẩm
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  );
};

export default ProductCreate;
