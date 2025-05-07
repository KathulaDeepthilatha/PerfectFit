import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();  // React Router's navigation hook

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', { email, password });
      console.log('Full response:', res.data);
  
      localStorage.setItem('token', res.data.token);
      const userRole = res.data.role;
  
      if (userRole === 'customer') {
        navigate('/order-tracker');
      } else if (userRole === 'tailor') {
        navigate('/fabric-stock');
      }  else {
        navigate('/');
      }
    } catch (err) {
      setMessage(err.response?.data?.message || 'Login failed');
    }
  };  

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button type="submit">Login</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default LoginPage;
