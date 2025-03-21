import React, { useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import './login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import {FaEye, FaEyeSlash} from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async(e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    
    try{
      const response = await axios.post('/api/login', {
        email,
        password,
      });
      const {user_id, role, email: userEmail, first_name, last_name, username} = response.data;

      
        localStorage.setItem('userId', user_id);
        localStorage.setItem('userRole', response.data.role);
        localStorage.setItem('email', userEmail);
        localStorage.setItem('password', password);
        localStorage.setItem('firstName', first_name);
        localStorage.setItem('lastName', last_name);
        localStorage.setItem('username', username);

        if(rememberMe){
          localStorage.setItem('rememberedEmail',email);
        }else{
          localStorage.removeItem('rememberedEmail')
        }
        

        switch (role){
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
     
      
    } catch (error){
     if (error.response){
      setError(error.response?.data?.message|| "Login failed" );
    }else{
      setError('Unable to connect to server');
    }
    console.error('Login error:', error);
  }finally {
    setLoading(false);
  }
};

const togglePasswordVisibility = () =>{
  setShowPassword(!showPassword);
};

useEffect(()=>{
  const rememberedEmail = localStorage.getItem('rememberedEmail');
  if (rememberedEmail){
    setEmail(rememberedEmail);
    setRememberMe(true);
  }
}, []);
       

  
  return (
    <div className="container mt-5">
      <h2 className="text-center">Login</h2>
      {error && <div className="alert alert-danger" role="alert">{error}</div>}
      <form onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">email</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <div className ="input-group">
          <input
            type={showPassword ? 'text': 'password'}
            className="form-control"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button 
          type="button" 
          className="btn btn-primary w-100" 
          onClick={togglePasswordVisibility}
        >
          {showPassword ? <FaEyeSlash/> : <FaEye/>}
        </button>
      </div>
     
        <div className='mb-3 form-check'>
          <input
           type ='checkbox'
           className='form-check-input'
           id='rememberMe'
           checked= {rememberMe}
           onChange={(e)=> setRememberMe(e.target.checked)}
          />
          <label className ="form-check-label" htmlFor ="rememberMe"> Remember Me</label>
        </div>
        <button
          type = "submit"
          className = "btn btn-primary w-100"
          disabled ={loading}
        >
         {loading}? (
          <>
            <span className = "spinner-border spinner-border-sm me-2" role ="status" aria-hidden="true"></span>
            logging in...
          </>
         ) : (
          'Login'
         )
        </button>
      </form>
    </div>
  );
}