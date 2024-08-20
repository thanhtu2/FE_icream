import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../style/OrderManagement.css' 

const OrderManagement = () => {
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [ordersResponse, usersResponse, productsResponse] = await Promise.all([
          axios.get('http://localhost:4000/orders'),
          axios.get('http://localhost:4000/users'),
          axios.get('http://localhost:4000/products')
        ]);
        setOrders(ordersResponse.data);
        setUsers(usersResponse.data);
        setProducts(productsResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy dữ liệu.');
      }
    };

    fetchData();
  }, []);

  const handleEditOrder = (orderId) => {
    navigate(`/admin/orders/${orderId}/edit`);
  };

  const handleDeleteOrder = async (orderId) => {
    try {
      await axios.delete(`http://localhost:4000/orders/${orderId}`);
      setOrders(prevOrders => prevOrders.filter(order => order.OrderID !== orderId));
      toast.success('Xóa đơn hàng thành công.');
    } catch (err) {
      toast.error('Lỗi khi xóa đơn hàng.');
    }
  };

  const getCustomerName = (customerId) => {
    const user = users.find(user => user.CustomerID === customerId);
    return user ? `${user.FirstName} ${user.LastName}` : 'Không tìm thấy';
  };

  const getProductName = (productId) => {
    const product = products.find(product => product.ProductID === productId);
    return product ? product.Name : 'Không tìm thấy';
  };

  const getRowClass = (status) => {
    const statusClasses = {
     'đang bom  ': { backgroundColor: '#red' },
      'đang giao': { backgroundColor: '#d1ecf1' },
      'sắp giao': { backgroundColor: 'red' },
    };
    return statusClasses[status] || '';
  };

  const sortedOrders = orders
    .slice()
    .sort((a, b) => {
      const statusOrder = {
        'đang giao': 1,
        'sắp giao': 2,
        'đang bom': 3,
      };

      if (statusOrder[a.Status] !== statusOrder[b.Status]) {
        return statusOrder[a.Status] - statusOrder[b.Status];
      }

      return new Date(b.OrderDate) - new Date(a.OrderDate);
    });

  return (
    <div className='orderManagements'>
      <h2>Danh sách đơn hàng</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <Button variant="success" onClick={() => navigate('/admin/orders/create')}>Tạo Đơn Hàng Mới</Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Khách hàng</th>
            <th>Sản phẩm</th>
            <th>Ngày đặt hàng</th>
            <th>Ngày giao hàng</th>
            <th>Trạng thái</th>
            <th>Thanh Toán</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {sortedOrders.map(order => (
            <tr key={order.OrderID} className={getRowClass(order.Status)}>
              <td>{order.OrderID}</td>
              <td>{getCustomerName(order.CustomerID)}</td>
              <td>{getProductName(order.ProductID)}</td>
              <td>{new Date(order.OrderDate).toLocaleDateString()}</td>
              <td>{new Date(order.ShipDate).toLocaleDateString()}</td>
              <td>{order.Status}</td>
              <td>{order.PaymentStatus}</td>
              <td>
                <Button variant="warning" onClick={() => handleEditOrder(order.OrderID)}>Sửa</Button>
                <Button variant="danger" style={{ marginLeft: '10px' }} onClick={() => handleDeleteOrder(order.OrderID)}>Xóa</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <ToastContainer />
    </div>
  );
};

export default OrderManagement;
