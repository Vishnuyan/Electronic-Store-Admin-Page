import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./index.css";

// Placeholder for initial data; you may want to fetch this from an API or server in a real app
const fetchInitialOrders = () => [
  { id: 1234, user: 'John Doe', date: '2024-08-12', status: 'Sales', total: 500 },
  { id: 1235, user: 'Jane Doe', date: '2024-07-11', status: 'Processing', total: 300 },
  { id: 1236, user: 'Alice Smith', date: '2024-08-10', status: 'Sales', total: 450 },
  { id: 1237, user: 'Bob Johnson', date: '2024-08-09', status: 'Sales', total: 600 },
  { id: 1238, user: 'Charlie Brown', date: '2024-07-08', status: 'Cancelled', total: 0 },
  { id: 1239, user: 'Diana Prince', date: '2024-08-07', status: 'Sales', total: 350 },
  { id: 1483, user: 'Hishanth Harin', date: '2024-07-07', status: 'Shipped', total: 350 },
  // Add more orders as needed
];

const OrderManagement = () => {
  const [orders, setOrders] = useState(fetchInitialOrders());
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [editOrder, setEditOrder] = useState(null);
  const [newOrder, setNewOrder] = useState({ user: '', date: '', status: 'Processing', total: '' });
  const navigate = useNavigate();

  // Handle order creation
  const handleAddOrder = () => {
    const newOrderData = { ...newOrder, id: Date.now() }; // Generate a unique ID
    setOrders([...orders, newOrderData]);
    setNewOrder({ user: '', date: '', status: 'Processing', total: '' }); // Reset form
  };

  // Handle order deletion
  const handleDeleteOrder = (orderId) => {
    setOrders(orders.filter(order => order.id !== orderId));
  };

  // Handle order editing
  const handleEditOrder = (orderId) => {
    const orderToEdit = orders.find(order => order.id === orderId);
    setEditOrder(orderToEdit);
  };

  const handleSaveEdit = () => {
    setOrders(orders.map(order =>
      order.id === editOrder.id ? editOrder : order
    ));
    setEditOrder(null);
  };

  // Filter orders based on search and status
  const filteredOrders = orders.filter(order => 
    order.user.toLowerCase().includes(search.toLowerCase()) &&
    (statusFilter === '' || order.status === statusFilter)
  );

  // Handle view shipped orders
  const viewShippedOrders = () => {
    const shippedOrders = orders.filter(order => order.status === 'Sales');
    navigate('/reports', { state: { shippedOrders } });
  };

  return (
    <div className='order-container'>
      <h1>Order Management</h1>

      {/* Search and Filter Inputs */}
      <div>
        <input 
          type="text" 
          placeholder="Search by user" 
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <select 
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
        >
          <option value="">All Statuses</option>
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Sales">Sales</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>

      {/* Add New Order */}
      <div>
        <h2>Add New Order</h2>
        <input 
          type="text" 
          placeholder="User" 
          value={newOrder.user}
          onChange={e => setNewOrder({ ...newOrder, user: e.target.value })}
        />
        <input 
          type="date" 
          value={newOrder.date}
          onChange={e => setNewOrder({ ...newOrder, date: e.target.value })}
        />
        <select 
          value={newOrder.status}
          onChange={e => setNewOrder({ ...newOrder, status: e.target.value })}
        >
          <option value="Processing">Processing</option>
          <option value="Shipped">Shipped</option>
          <option value="Sales">Sales</option>
          <option value="Cancelled">Cancelled</option>
        </select>
        <input 
          type="number" 
          placeholder="Total"
          value={newOrder.total}
          onChange={e => setNewOrder({ ...newOrder, total: e.target.value })}
        />
        <button onClick={handleAddOrder}>Add Order</button>
      </div>

      {/* Edit Order */}
      {editOrder && (
        <div>
          <h2>Edit Order</h2>
          <input 
            type="text" 
            value={editOrder.user}
            onChange={e => setEditOrder({ ...editOrder, user: e.target.value })}
          />
          <input 
            type="date" 
            value={editOrder.date}
            onChange={e => setEditOrder({ ...editOrder, date: e.target.value })}
          />
          <select 
            value={editOrder.status}
            onChange={e => setEditOrder({ ...editOrder, status: e.target.value })}
          >
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Sales">Sales</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <input 
            type="number" 
            value={editOrder.total}
            onChange={e => setEditOrder({ ...editOrder, total: e.target.value })}
          />
          <button onClick={handleSaveEdit}>Save Changes</button>
          <button onClick={() => setEditOrder(null)}>Cancel</button>
        </div>
      )}

      <button className="reports-button" onClick={viewShippedOrders}>Reports</button>

      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredOrders.map(order => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{order.user}</td>
              <td>{order.date}</td>
              <td>{order.status}</td>
              <td>${order.total}</td>
              <td>
                <button onClick={() => handleEditOrder(order.id)}>Edit</button>
                <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OrderManagement;


