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

      if (response.data && response.data.role){
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('username', username);
        localStorage.setItem('password', password);

        switch (response.data.role){
          case "admin":
            navigate("/admin")
            break
          case "student":
            navigate("/student")
            break
          case "president":
            navigate("/president")
            break
          default:
            setError("Unkonw user role")
        }
      }else{
        setError("Invalid")
      }
    }catch(error){
      console.error("Error", error)
      setError(error.response?.data?.message|| "Invalid username" )
    }
  }
       

  
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