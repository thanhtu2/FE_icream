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
    const [products, setProducts] = useState([]);
    const [error, setError] = useState('');
    const { discountId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Lấy danh sách sản phẩm từ API
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy danh sách sản phẩm:', err.response?.data || err.message);
            }
        };

        // Lấy thông tin mã giảm giá nếu đang chỉnh sửa
        const fetchDiscount = async () => {
            if (discountId) {
                try {
                    const response = await axios.get(`http://localhost:4000/discounts/${discountId}`);
                    const discount = response.data;
                    setTitle(discount.Title);
                    setDescription(discount.Description);
                    setDiscountPercent(discount.DiscountPercent);
                    setStartDate(discount.StartDate);
                    setEndDate(discount.EndDate);
                    setProductId(discount.ProductID);
                } catch (err) {
                    console.error('Lỗi khi lấy thông tin mã giảm giá:', err.response?.data || err.message);
                    setError('Lỗi khi lấy thông tin mã giảm giá.');
                }
            }
        };

        fetchProducts();
        fetchDiscount();
    }, [discountId]);

    const handleProductChange = (e) => {
        setProductId(e.target.value);
    };

    const handleSave = async () => {
        if (!title || !description || !discountPercent || !startDate || !endDate || !productId) {
            setError('Vui lòng nhập đầy đủ thông tin mã giảm giá.');
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
                toast.success('Cập nhật mã giảm giá thành công.');
            } else {
                await axios.post('http://localhost:4000/discounts', {
                    Title: title,
                    Description: description,
                    DiscountPercent: discountPercent,
                    StartDate: startDate,
                    EndDate: endDate,
                    ProductID: productId,
                });
                toast.success('Thêm mã giảm giá thành công.');
            }

            navigate('/admin/discounts');
        } catch (error) {
            console.error('Lỗi khi lưu mã giảm giá:', error.response?.data || error.message);
            setError('Lỗi khi lưu mã giảm giá.');
        }
    };

    const handleDelete = async () => {
        if (!discountId) return;

        try {
            await axios.delete(`http://localhost:4000/discounts/${discountId}`);
            toast.success('Xóa mã giảm giá thành công.');
            navigate('/discounts');
        } catch (error) {
            console.error('Lỗi khi xóa mã giảm giá:', error.response?.data || error.message);
            setError('Lỗi khi xóa mã giảm giá.');
        }
    };

    return (
        <Container>
            <h1>{discountId ? 'Edit Discount' : 'Add Discount'}</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form>
                <Form.Group controlId="formTitle">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Enter description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formDiscountPercent">
                    <Form.Label>Discount Percent</Form.Label>
                    <Form.Control
                        type="number"
                        placeholder="Enter discount percent"
                        value={discountPercent}
                        onChange={(e) => setDiscountPercent(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formStartDate">
                    <Form.Label>Start Date</Form.Label>
                    <Form.Control
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group controlId="formEndDate">
                    <Form.Label>End Date</Form.Label>
                    <Form.Control
                        type="date"
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
                                {product.Name} - ${product.Price}
                            </option>
                        ))}
                    </Form.Control>
                </Form.Group>
                <Button variant="primary" onClick={handleSave}>
                    {discountId ? 'Update Discount' : 'Save Discount'}
                </Button>
                {discountId && (
                    <Button variant="danger" onClick={handleDelete} style={{ marginLeft: '10px' }}>
                        Delete Discount
                    </Button>
                )}
            </Form>
            <ToastContainer />
        </Container>
    );
};

export default DiscountForm;
