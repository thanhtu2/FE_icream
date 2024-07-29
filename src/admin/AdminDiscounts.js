import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminDiscounts = () => {
    const [discounts, setDiscounts] = useState([]);
    const [products, setProducts] = useState([]);
    const [discountError, setDiscountError] = useState('');

    useEffect(() => {
        const fetchDiscounts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/discounts');
                setDiscounts(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy thông tin khuyến mãi:', err.response?.data || err.message);
                setDiscountError('Lỗi khi lấy thông tin khuyến mãi.');
            }
        };

        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:4000/products');
                setProducts(response.data);
            } catch (err) {
                console.error('Lỗi khi lấy thông tin sản phẩm:', err.response?.data || err.message);
            }
        };

        fetchDiscounts();
        fetchProducts();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:4000/discounts/${id}`);
            setDiscounts(discounts.filter(discount => discount.DiscountID !== id));
            toast.success('Xóa khuyến mãi thành công.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        } catch (error) {
            toast.error('Lỗi khi xóa khuyến mãi.', {
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

    // Tạo một map để tra cứu tên sản phẩm và giá
    const productMap = new Map(products.map(product => [product.ProductID, { Name: product.Name, Price: product.Price }]));

    return (
        <Container style={{ maxWidth: '1500px', marginTop: '40px' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '3rem', color: '#333' }}>Discount List</h1>
            {discountError && <Alert variant="danger" style={{ fontSize: '1.5rem' }}>{discountError}</Alert>}
            <Table striped bordered hover style={{ marginTop: '30px', fontSize: '1.2rem', backgroundColor: '#f8f9fa' }}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Discount Percent</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Product</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {discounts.map(discount => {
                        const product = productMap.get(discount.ProductID);
                        return (
                            <tr key={discount.DiscountID}>
                                <td>{discount.DiscountID}</td>
                                <td>{discount.Title}</td>
                                <td>{discount.Description}</td>
                                <td>{discount.DiscountPercent}%</td>
                                <td>{new Date(discount.StartDate).toLocaleDateString()}</td>
                                <td>{new Date(discount.EndDate).toLocaleDateString()}</td>
                                <td>{product ? `${product.Name} - $${product.Price}` : 'N/A'}</td>
                                <td>
                                    <Button variant="warning" href={`/discount/${discount.DiscountID}`} style={{ fontSize: '0.9rem', padding: '6px 12px', marginRight: '15px' }}>Sửa</Button>
                                    <Button variant="danger" onClick={() => handleDelete(discount.DiscountID)} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>Xóa</Button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </Table>
            <Button variant="primary" href="/discount/new" style={{ marginTop: '30px', fontSize: '1.2rem', padding: '10px 20px' }}>Add New Discount</Button>
            <ToastContainer />
        </Container>
    );
};

export default AdminDiscounts;
