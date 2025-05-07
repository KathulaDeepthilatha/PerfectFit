import { useState } from 'react';
import axios from 'axios';

export default function AddCustomer() {
  const [form, setForm] = useState({
    name: '', phone: '', gender: '', chest: '', waist: '', shoulder: '', hips: '', length: '', notes: ''
  });

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/customers', {
      ...form,
      measurements: {
        chest: form.chest,
        waist: form.waist,
        shoulder: form.shoulder,
        hips: form.hips,
        length: form.length
      }
    });
    alert("Customer Added!");
    setForm({});
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-xl mx-auto bg-white p-6 shadow rounded">
      <h2 className="text-xl font-bold mb-4">Add Customer Measurements</h2>
      {['name', 'phone', 'gender', 'chest', 'waist', 'shoulder', 'hips', 'length', 'notes'].map(field => (
        <input
          key={field}
          name={field}
          type="text"
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          value={form[field] || ''}
          onChange={handleChange}
          className="w-full mb-3 p-2 border rounded"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded">Submit</button>
    </form>
  );
}
