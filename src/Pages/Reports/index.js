import React, { useEffect, useState } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './index.css';

const data = [
  { month: 'Jan', sales: 4000 },
  { month: 'Feb', sales: 3000 },
  { month: 'Mar', sales: 2000 },
  { month: 'Apr', sales: 2780 },
  { month: 'May', sales: 1890 },
  { month: 'Jun', sales: 2390 },
  { month: 'Jul', sales: 3490 },
  { month: 'Aug', sales: 4000 },
];

const Reports = () => {
  const [salesOrders, setSalesOrders] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const orders = fetchInitialOrders();

    const filterOrders = (orders) => {
      return orders.filter(order => {
        const orderDate = new Date(order.date);
        const start = startDate ? new Date(startDate) : null;
        const end = endDate ? new Date(endDate) : null;

        return (
          order.status === 'Sales' &&
          (!start || orderDate >= start) &&
          (!end || orderDate <= end)
        );
      });
    };

    const filteredOrders = filterOrders(orders);
    setSalesOrders(filteredOrders);
  }, [startDate, endDate]);

  const handleDownloadPDF = () => {
    const doc = new jsPDF();
    const tableColumn = ["Order ID", "User", "Date", "Total"];
    const tableRows = salesOrders.map(order => [
      `#${order.id}`,
      order.user,
      order.date,
      `$${order.total}`
    ]);

    doc.text("Sales Orders Report", 14, 16);
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30
    });

    doc.save('sales_orders_report.pdf');
  };

  const handleDownloadExcel = () => {
    const ws = XLSX.utils.json_to_sheet(salesOrders.map(order => ({
      'Order ID': `#${order.id}`,
      'User': order.user,
      'Date': order.date,
      'Total': `$${order.total}`
    })));
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sales Orders');
    XLSX.writeFile(wb, 'sales_orders_report.xlsx');
  };

  const fetchInitialOrders = () => [
    { id: 1234, user: 'John Doe', date: '2024-08-12', status: 'Sales', total: 500 },
    { id: 1235, user: 'Jane Doe', date: '2024-08-11', status: 'Processing', total: 300 },
    { id: 1236, user: 'Alice Smith', date: '2024-08-10', status: 'Sales', total: 450 },
    { id: 1237, user: 'Bob Johnson', date: '2024-08-09', status: 'Sales', total: 600 },
    { id: 1238, user: 'Charlie Brown', date: '2024-08-08', status: 'Cancelled', total: 0 },
    { id: 1239, user: 'Diana Prince', date: '2024-08-07', status: 'Sales', total: 350 },
    // Add more orders as needed
  ];

  return (
    <div className="report-container">
      <h1>Sales Orders Report</h1>
      <div className="buttons">
        <button onClick={handleDownloadPDF}>Download PDF</button>
        <button onClick={handleDownloadExcel}>Download Excel</button>
      </div>

      <div className="report-dateFilter">
        <label>Start Date: </label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <label>End Date: </label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div className="table-container">
        {salesOrders.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th>Order ID</th>
                <th>User</th>
                <th>Date</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {salesOrders.map(order => (
                <tr key={order.id}>
                  <td>#{order.id}</td>
                  <td>{order.user}</td>
                  <td>{order.date}</td>
                  <td>${order.total}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No Sales orders available for the selected date range.</p>
        )}
      </div>

      <h2>Sales Report</h2>
      <div className="bar-chart-container">
        <ResponsiveContainer width="60%" height={400}>
          <BarChart
            data={data}
            margin={{
              top: 5, right: 30, left: 20, bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Reports;
