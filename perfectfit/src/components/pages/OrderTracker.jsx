import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function OrderTracker() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/orders');
      setOrders(res.data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status });
      fetchOrders();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Order Tracker</h2>
      <div className="grid gap-4">
        {orders.map((order) => (
          <div key={order._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{order.customerId?.name || 'Unknown Customer'}</h3>
            <p>Phone: {order.customerId?.phone}</p>
            <p>Status: <strong>{order.status}</strong></p>
            <p>Delivery Date: {new Date(order.deliveryDate).toLocaleDateString()}</p>

            <div className="mt-3">
              <label className="block font-medium mb-1" htmlFor={`status-${order._id}`}>
                Update Status:
              </label>
              <select
                id={`status-${order._id}`}
                className="p-2 border rounded w-full md:w-1/2"
                value={order.status}
                onChange={(e) => updateStatus(order._id, e.target.value)}
              >
                {['Design Selected', 'Cutting', 'Stitching', 'Trial Ready', 'Delivered'].map(stage => (
                  <option key={stage} value={stage}>{stage}</option>
                ))}
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
