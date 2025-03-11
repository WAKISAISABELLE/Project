import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');
    
    try{
      const response = await axios.post('/api/login', {
        username,
        password,
      });

      if (response.data.role === 'admin'){
        localStorage.setItem('userRole', 'admin');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/admin');
      }else if (response.data.role === 'student'){
        localStorage.setItem('userRole', 'student');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/student');
      }else if (response.data.role === 'president'){
        localStorage.setItem('userRole', 'president');
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);
        navigate('/president');
      }
    } catch (error){
      setError('Invalid username or password');
      console.error('Error logging in:', error);
    }
  };

  
  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary w-100">Login</button>
      </form>
    </div>
  );
}