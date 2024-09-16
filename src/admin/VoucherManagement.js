import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, Button, Form } from 'react-bootstrap';
import axios from 'axios';
import { useToast } from '../hooks/useToast';

const VoucherManagement = () => {
  const [vouchers, setVouchers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const fetchVouchers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/vouchers');
        console.log('Vouchers fetched:', response.data); // Log the response data
        setVouchers(response.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin voucher.');
        console.error('Error fetching vouchers:', err); // Log any error for debugging
      }
    };
  
    fetchVouchers();
  }, []);
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(); // Định dạng ngày theo định dạng địa phương
  }

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.ProgramID && voucher.ProgramID.toString().toLowerCase().includes(searchTerm.toLowerCase())
  );
  

  const handleDeleteVoucher = async voucherId => {
    try {
      await axios.delete(`http://localhost:4000/vouchers/${voucherId}`);
      setVouchers(vouchers.filter(voucher => voucher.ProgramID !== voucherId));
      successToast('Ẩn voucher thành công.');
    } catch (err) {
      errorToast('Lỗi khi ẩn voucher.');
    }
  };

  return (
    <div className="p-[50px] w-[90%] m-auto">
      <h2 style={{ textAlign: 'center', padding: '20px 0' }}>
        Danh sách voucher
      </h2>
      
      {error && <p className="text-primaryDanger">{error}</p>}
      <Form.Control
        type="text"
        placeholder="Tìm kiếm voucher"
        value={searchTerm}
        onChange={handleSearch}
        className="mb-[20px]"
      />
      <Button
        variant="success"
        className="text-white bg-primaryDanger hover:bg-secondDanger mb-[20px]"
        onClick={() => navigate('/admin/vouchers/create')}
      >
        Thêm mới voucher
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>CustomerID</th>
            <th>PointsEarned</th>
            <th>Redeemed</th>
            <th>RedeemedDate</th>
            <th>CreatedAt</th>
            <th>DiscountType</th>
            <th>DiscountValue</th>
            <th>Actions</th> {/* Add an actions column for buttons */}
          </tr>
        </thead>
        <tbody>
          {filteredVouchers.length > 0 ? (
            filteredVouchers.map(voucher => (
              <tr key={voucher.ProgramID}>
                <td>{voucher.ProgramID}</td>
                <td>{voucher.CustomerID}</td>
                <td>{voucher.PointsEarned}</td>
                <td>{voucher.Redeemed ? 'Yes' : 'No'}</td>
                <td>{voucher.RedeemedDate || 'Chưa sử dụng'}</td>
                <td>{formatDate(voucher.CreatedAt)}</td>
                <td>{voucher.DiscountType}</td>
                <td>{voucher.DiscountValue}</td>
                <td>
                  <Button
                    className="text-white bg-primaryDanger hover:bg-secondDanger"
                    variant="danger"
                    onClick={() => handleDeleteVoucher(voucher.ProgramID)}
                  >
                    Xóa
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="9" style={{ textAlign: 'center' }}>
                Không có dữ liệu
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  );
};

export default VoucherManagement;
