import React, { useState, useEffect } from 'react';
import { Container, Form, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DiscountForm = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [discountPercent, setDiscountPercent] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [productId, setProductId] = useState('');
    const [productName, setProductName] = useState('');
    const [productPrice, setProductPrice] = useState('');
    const [products, setProducts] = useState([]);
    const [discountError, setDiscountError] = useState('');
    const [discountSuccess, setDiscountSuccess] = useState('');
    const { discountId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', err.response?.data || err.message);
            }
        };

        const fetchDiscount = async () => {
            if (discountId) {
                try {
                    const response = await axios.get(`http://localhost:4000/discounts/${discountId}`);
                    const discount = response.data;
                    setTitle(discount.Title);
                    setDescription(discount.Description);
                    setDiscountPercent(discount.DiscountPercent);
                    setStartDate(new Date(discount.StartDate).toISOString().substr(0, 10));
                    setEndDate(new Date(discount.EndDate).toISOString().substr(0, 10));
                    setProductId(discount.ProductID);

                    // Cập nhật tên sản phẩm và giá dựa trên ProductID
                    const product = products.find(product => product.ProductID === discount.ProductID);
                    if (product) {
                        setProductName(product.Name);
                        setProductPrice(product.Price);
                    }
                } catch (err) {
                    console.error('Lỗi khi lấy thông tin khuyến mãi:', err.response?.data || err.message);
                    setDiscountError('Lỗi khi lấy thông tin khuyến mãi.');
                }
            }
        };

        fetchProducts();
        fetchDiscount();
    }, [discountId, products]);

    const handleProductChange = (e) => {
        const selectedProductId = e.target.value;
        setProductId(selectedProductId);

        // Tìm sản phẩm đã chọn từ danh sách sản phẩm
        const selectedProduct = products.find(product => product.ProductID === selectedProductId);
        if (selectedProduct) {
            setProductName(selectedProduct.Name);
            setProductPrice(selectedProduct.Price);
        } else {
            setProductName('');
            setProductPrice('');
        }
    };

    const handleSave = async () => {
        if (!title || !description || !discountPercent || !startDate || !endDate || !productId) {
            setDiscountError('Vui lòng nhập đầy đủ thông tin khuyến mãi.');
            return;
        }

        try {
            if (discountId) {
                await axios.put(`http://localhost:4000/discounts/${discountId}`, {
                    Title: title,
                    Description: description,
                    DiscountPercent: discountPercent,
                    StartDate: startDate,
                    EndDate: endDate,
                    ProductID: productId,
                });
                setDiscountSuccess('Cập nhật khuyến mãi thành công.');
            } else {
                await axios.post('http://localhost:4000/discounts', {
                    Title: title,
                    Description: description,
                    DiscountPercent: discountPercent,
                    StartDate: startDate,
                    EndDate: endDate,
                    ProductID: productId,
                });
                setDiscountSuccess('Thêm khuyến mãi thành công.');
            }

            setDiscountError('');
            navigate('/discounts');
        } catch (error) {
            console.error('Lỗi khi lưu khuyến mãi:', error.response?.data || error.message);
            setDiscountError('Lỗi khi lưu khuyến mãi.');
            setDiscountSuccess('');
        }
    };

    return (
        <Container style={{ maxWidth: '900px', marginTop: '20px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem', color: '#333' }}>
                {discountId ? 'Edit Discount' : 'Add Discount'}
            </h1>
            {discountError && <Alert variant="danger">{discountError}</Alert>}
            {discountSuccess && <Alert variant="success">{discountSuccess}</Alert>}
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDiscountPercent">
                    <Form.Label>Discount Percent</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Discount Percent"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="Start Date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
                        placeholder="End Date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formProduct">
                    <Form.Label>Product</Form.Label>
                    <Form.Control
                        as="select"
                        value={productId}
                        onChange={handleProductChange}
                        required
                    >
                        <option value="">Select a product</option>
                        {products.map(product => (
                            <option key={product.ProductID} value={product.ProductID}>
                                {product.Name} - {product.Price}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                
                <Button variant="primary" onClick={handleSave}>
                    {discountId ? 'Update Discount' : 'Save Discount'}
                </Button>
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default DiscountForm;
