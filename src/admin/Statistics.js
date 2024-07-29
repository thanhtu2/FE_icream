// src/components/Statistics.js
import React, { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import '../style/statistics.css'; // Đảm bảo đường dẫn đến file CSS đúng

// Đăng ký các thành phần cần thiết với Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Statistics = () => {
  const [dailySalesStats, setDailySalesStats] = useState([]);
  const [monthlySalesStats, setMonthlySalesStats] = useState([]);
  const [yearlySalesStats, setYearlySalesStats] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const dailyResponse = await axios.get('http://localhost:4000/sales/daily');
        setDailySalesStats(dailyResponse.data);

        const monthlyResponse = await axios.get('http://localhost:4000/sales/monthly');
        setMonthlySalesStats(monthlyResponse.data);

        const yearlyResponse = await axios.get('http://localhost:4000/sales/yearly');
        setYearlySalesStats(yearlyResponse.data);

        const orderResponse = await axios.get('http://localhost:4000/orders');
        setOrderData(orderResponse.data);

        setLoading(false);
      } catch (err) {
        setError('Lỗi khi lấy thông tin thống kê.');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  // Prepare data for the orders chart
  const orderDates = orderData.map(order => new Date(order.OrderDate).toLocaleDateString());
  const orderCounts = orderDates.reduce((acc, date) => {
    acc[date] = (acc[date] || 0) + 1;
    return acc;
  }, {});

  const orderChartData = {
    labels: Object.keys(orderCounts),
    datasets: [
      {
        label: 'Số lượng đơn hàng',
        data: Object.values(orderCounts),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  // Prepare data for the sales charts
  const dailySalesChartData = {
    labels: dailySalesStats.map(stat => stat.date),
    datasets: [
      {
        label: 'Doanh số hàng ngày',
        data: dailySalesStats.map(stat => stat.total),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const monthlySalesChartData = {
    labels: monthlySalesStats.map(stat => stat.month),
    datasets: [
      {
        label: 'Doanh số hàng tháng',
        data: monthlySalesStats.map(stat => stat.total),
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  const yearlySalesChartData = {
    labels: yearlySalesStats.map(stat => stat.year),
    datasets: [
      {
        label: 'Doanh số hàng năm',
        data: yearlySalesStats.map(stat => stat.total),
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <Container>
      <h1 className="chart-title">Thống Kê</h1>

      <div className="chart-row">
        <h2 className="chart-title">Đơn Hàng và Doanh Số Hàng Ngày</h2>
        <Row>
          <Col md={6} className="chart-container">
            <Bar data={orderChartData} />
          </Col>
          <Col md={6} className="chart-container">
            <Bar data={dailySalesChartData} />
          </Col>
        </Row>
      </div>

      <div className="chart-row">
        <h2 className="chart-title">Doanh Số Hàng Tháng và Hàng Năm</h2>
        <Row>
          <Col md={6} className="chart-container">
            <Bar data={monthlySalesChartData} />
          </Col>
          <Col md={6} className="chart-container">
            <Bar data={yearlySalesChartData} />
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default Statistics;
