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
        const voucherResponse = await axios.get(
          `http://localhost:4000/vouchers`,
        );
        setVouchers(voucherResponse.data);
      } catch (err) {
        setError('Lỗi khi lấy thông tin voucher.');
      }
    };

    fetchVouchers();
  }, []);

  const handleSearch = e => {
    setSearchTerm(e.target.value);
  };

  const filteredVouchers = vouchers.filter(voucher =>
    voucher.voucherName && voucher.voucherName.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const handleDeleteVoucher = async voucherId => {
    try {
      await axios.delete(`http://localhost:4000/vouchers/${voucherId}`);
      setVouchers(vouchers.filter(voucher => voucher.voucherID !== voucherId));
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
            <th>Điểm kiếm được</th>
            <th>Redeemed</th>
            <th>RedeemedDate</th>
            <th>CreatedAt</th>
            <th>DiscountType</th>
            <th>DiscountValue</th>
          </tr>
        </thead>
        <tbody>
          {filteredVouchers.map(voucher => (
            <tr key={voucher.ProgramID}>
              <td>{voucher.ProgramID}</td>
              <td>{voucher.CustomerID}</td>
              <td>{voucher.PointsEarned}</td>
              <td>{voucher.Redeemed}</td>
              <td>{voucher.RedeemedDate}</td>
              <td>{voucher.CreatedAt}</td>
              <td>{voucher.DiscountType}</td>
              <td>{voucher.DiscountValue}</td>
              <td>
                <Button
                  className="text-white bg-primaryDanger hover:bg-secondDanger "
                  variant="danger"
                  onClick={() => handleDeleteVoucher(voucher.voucherID)}
                >
                  Xóa
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default VoucherManagement;
