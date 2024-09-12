import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useToast } from '../hooks/useToast';

const StoreManagement = () => {
  const [stores, setStores] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const fetchStores = async () => {
      try {
        const storeResponse = await axios.get(`http://localhost:4000/stores`);
        setStores(storeResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin cửa hàng.');
      }
    };

    fetchStores();
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredStores = stores.filter(store =>
    store.StoreName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleHideStore = async storeId => {
    try {
      await axios.patch(`http://localhost:4000/stores/${storeId}`);
      setStores(stores.filter(store => store.storeID !== storeId));
      successToast('Ẩn cửa hàng thành công.');
    } catch (err) {
      errorToast('Lỗi khi ẩn cửa hàng.');
    }
  };

  return (
    <div className="p-[50px] w-[90%] m-auto">
      <h2 style={{ textAlign: 'center', padding: '20px 0' }}>
        Danh sách cửa hàng
      </h2>
      {error && <p className="text-primaryDanger">{error}</p>}
      <Form.Control
        type="text"
        placeholder="Tìm kiếm cửa hàng"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-[20px]"
      />
      <Button
        variant="success"
        className="text-white bg-primaryDanger hover:bg-secondDanger mb-[20px]"
        onClick={() => navigate('/admin/stores/create')}
      >
        Thêm cửa hàng
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Tên Cửa Hàng</th>
            <th>Địa chỉ</th>
            <th>City</th>
            <th>ZipCode</th>
            <th>Số điện thoại</th>
          </tr>
        </thead>
        <tbody>
          {filteredStores.map(store => (
            <tr key={store.storeID}>
              <td>{store.storeID}</td>
              <td>{store.Name}</td>
              <td>{store.Price}</td>
              <td>{store.Stock}</td>
              <td>
                <Button
                  className="text-white bg-primaryDanger hover:bg-secondDanger "
                  variant="danger"
                  onClick={() => handleHideStore(store.storeID)}
                >
                  Ẩn
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default StoreManagement;
