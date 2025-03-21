// import React, { useState } from 'react';
// import './signup.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// export default function SignupPage() {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleSignup = async(e) => {
//     e.preventDefault();
//     if (password !== confirmPassword) {
//       setError('Passwords do not match');
//       return;
//     }
//     try {
//       const response = await axios.post('/api/signup',{
//         username: email,
//         password,
//         role: 'student'
//       });

//       if (response.status ===201){
//         alert('Signup successful');
//         navigate ('/login');
//       }
//     } catch (error){
//       setError('Error during signup.')
//       console.error('Error during signup', error)
//       }
//     };
   
 

//   return (
//     <div className="container mt-5">
//       <h2 className="text-center">Sign Up</h2>
//       {error && <div className="alert alert-danger" role="alert">{error}</div>}
//       <form onSubmit={handleSignup}>
//         <div className="mb-3">
//           <label htmlFor="email" className="form-label">Email address</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="mb-3">
//           <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
//           <input
//             type="password"
//             className="form-control"
//             id="confirmPassword"
//             value={confirmPassword}
//             onChange={(e) => setConfirmPassword(e.target.value)}
//             required
//           />
//         </div>
//         <div className="form-check mb-3">
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="remember"
//             defaultChecked
//           />
//           <label className="form-check-label" htmlFor="remember">Remember me</label>
//         </div>
//         {/* <p>By creating an account you agree to our <button type="button" className="btn btn-link p-0" style={{ color: 'dodgerblue' }}>Terms & Privacy</button>.</p> */}
//         <div className="d-flex justify-content-between">
//           <button type="button" className="btn btn-secondary">Cancel</button>
//           <button type="submit" className="btn btn-primary">Sign Up</button>
//         </div>
//       </form>
//     </div>
//   );
// }