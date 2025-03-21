import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Admin from './Dashboard/admin.js';
import Student from './Dashboard/student.js';
import Login from './components/login';
// import Signup from './components/signup';
import Welcome from './components/welcome';
import President from './Dashboard/president.js';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/student" element={<Student />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/signup" element={<Signup />} /> */}
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/president" element={<President/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;