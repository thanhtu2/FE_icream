import React, { useEffect, useState } from 'react';
import { Form, Button, Container } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../hooks/useToast';

const VoucherCreate = () => {
  const [voucher, setVoucher] = useState({
    CustomerID: 0,
    PointsEarned: 0,
    DiscountType: '',
    DiscountValue: 0,
    Redeemed: true,
    RedeemedDate: '',
    CreatedAt: '',
  });
  const [customers, setCustomers] = useState([]);

  const navigate = useNavigate();
  const { errorToast, successToast } = useToast();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get('http://localhost:4000/users'); // Lấy danh sách khách hàng
        setCustomers(response.data);
      } catch (err) {
        errorToast('Lỗi khi lấy thông tin khách hàng.');
      }
    };

    fetchCustomers();
  }, [errorToast]);

  const handleChange = e => {
    const { name, value } = e.target;
    setVoucher({ ...voucher, [name]: value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:4000/vouchers', voucher);
      successToast('Tạo voucher mới thành công.');
      navigate('/admin/vouchers');
    } catch (err) {
      errorToast('Lỗi khi tạo voucher mới.');
    }
  };

  return (
    <Container style={{ marginTop: '20px', padding: '50px' }}>
      <h1 style={{ textAlign: 'center', padding: '20px 0' }}>
        Thêm Voucher Mới
      </h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formCustomerID">
          <Form.Label style={{ fontWeight: '600' }}>Khách Hàng</Form.Label>
          <Form.Control
            as="select"
            name="CustomerID"
            value={voucher.CustomerID}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Khách Hàng</option>
            {customers.map(customer => (
              <option key={customer.CustomerID} value={customer.CustomerID}>
                {`${customer.FirstName} ${customer.LastName}`}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formPointsEarned">
          <Form.Label style={{ fontWeight: '600', marginTop: '15px' }}>
            Điểm kiếm được
          </Form.Label>
          <Form.Control
            type="number"
            name="PointsEarned"
            value={voucher.PointsEarned}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formDiscountType">
          <Form.Label style={{ fontWeight: '600' }}>DiscountType</Form.Label>
          <Form.Control
            as="select"
            name="DiscountType"
            value={voucher.DiscountType}
            onChange={handleChange}
            required
          >
            <option value="">Chọn Discount Type</option>
            <option key={1} value={'percent'}>
              Percent
            </option>
            <option key={2} value={'fixed'}>
              Fixed
            </option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="formDiscountValue">
          <Form.Label style={{ fontWeight: '600', marginTop: '15px' }}>
            Discount Value
          </Form.Label>
          <Form.Control
            type="number"
            name="DiscountValue"
            value={voucher.DiscountValue}
            onChange={handleChange}
            required
          />
        </Form.Group>
        <Form.Group controlId="formRedeemed">
          <Form.Check
            type="checkbox"
            label="Đã sử dụng"
            name="Redeemed"
            checked={voucher.Redeemed}
            onChange={e =>
              setVoucher({ ...voucher, Redeemed: e.target.checked })
            }
          />
        </Form.Group>
        <Form.Group controlId="formRedeemedDate">
          <Form.Label style={{ fontWeight: '600' }}>Ngày sử dụng</Form.Label>
          <Form.Control
            type="date"
            name="RedeemedDate"
            value={voucher.RedeemedDate}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group controlId="formCreatedAt">
          <Form.Label style={{ fontWeight: '600' }}>Ngày tạo</Form.Label>
          <Form.Control
            type="date"
            name="CreatedAt"
            value={voucher.CreatedAt}
            onChange={handleChange}
          />
        </Form.Group>
        <Button
          className="danger-button mb-[20px]"
          variant="primary"
          type="submit"
          style={{ marginTop: '20px', background: '#73262C' }}
        >
          Thêm voucher
        </Button>
      </Form>
    </Container>
  );
};

export default VoucherCreate;
