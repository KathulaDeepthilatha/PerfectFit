import { useState, useEffect } from 'react';
import axios from 'axios';

export default function GenerateBill() {
  const [orders, setOrders] = useState([]);
  const [bill, setBill] = useState({
    orderId: '',
    amount: '',
    discount: 0,
    tax: 0,
    notes: ''
  });

  const fetchOrders = async () => {
    const res = await axios.get('http://localhost:5000/api/orders');
    setOrders(res.data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleChange = e => setBill({ ...bill, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/billings', bill);
    alert('Bill Generated!');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Generate Bill</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label>Order</label>
          <select
            name="orderId"
            className="w-full p-2 border rounded"
            value={bill.orderId}
            onChange={handleChange}
          >
            <option value="">Select Order</option>
            {orders.map(order => (
              <option key={order._id} value={order._id}>
                {order.customerId.name} - {order.status}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            className="w-full p-2 border rounded"
            value={bill.amount}
            onChange={handleChange}
            placeholder="Amount"
          />
        </div>

        <div>
          <label>Discount (%)</label>
          <input
            type="number"
            name="discount"
            className="w-full p-2 border rounded"
            value={bill.discount}
            onChange={handleChange}
            placeholder="Discount"
          />
        </div>

        <div>
          <label>Tax (%)</label>
          <input
            type="number"
            name="tax"
            className="w-full p-2 border rounded"
            value={bill.tax}
            onChange={handleChange}
            placeholder="Tax"
          />
        </div>

        <div>
          <label>Notes</label>
          <textarea
            name="notes"
            className="w-full p-2 border rounded"
            value={bill.notes}
            onChange={handleChange}
            placeholder="Notes"
          ></textarea>
        </div>

        <button className="bg-blue-600 text-white p-2 rounded">Generate Bill</button>
      </form>
    </div>
  );
}
