import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AppointmentScheduler() {
  const [customers, setCustomers] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    customerId: '',
    appointmentDate: '',
    purpose: ''
  });

  const fetchCustomers = async () => {
    const res = await axios.get('http://localhost:5000/api/customers');
    setCustomers(res.data);
  };

  const fetchAppointments = async () => {
    const res = await axios.get('http://localhost:5000/api/appointments');
    setAppointments(res.data);
  };

  useEffect(() => {
    fetchCustomers();
    fetchAppointments();
  }, []);

  const handleChange = e => setNewAppointment({ ...newAppointment, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/appointments', newAppointment);
    setNewAppointment({});
    fetchAppointments();
    alert('Appointment Scheduled!');
  };

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Schedule Appointment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <select
          name="customerId"
          className="w-full p-2 border rounded"
          value={newAppointment.customerId}
          onChange={handleChange}
        >
          <option value="">Select Customer</option>
          {customers.map((customer) => (
            <option key={customer._id} value={customer._id}>
              {customer.name} - {customer.phone}
            </option>
          ))}
        </select>

        <input
          name="appointmentDate"
          value={newAppointment.appointmentDate}
          onChange={handleChange}
          type="datetime-local"
          className="w-full p-2 border rounded"
        />

        <input
          name="purpose"
          value={newAppointment.purpose}
          onChange={handleChange}
          className="w-full p-2 border rounded"
          placeholder="Purpose of Visit"
        />

        <button className="bg-blue-600 text-white p-2 rounded">Schedule Appointment</button>
      </form>

      <div className="space-y-4 mt-8">
        {appointments.map((appointment) => (
          <div key={appointment._id} className="p-4 border rounded shadow bg-white">
            <h3 className="text-lg font-semibold">{appointment.customerId.name}</h3>
            <p>Appointment Date: {new Date(appointment.appointmentDate).toLocaleString()}</p>
            <p>Purpose: {appointment.purpose}</p>
            <p>Status: {appointment.status}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
