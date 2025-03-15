
import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Login from './pages/Ligin';
import Register from './pages/Register';
import Investments from './pages/Investment';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Contact from './pages/Contact'
import Services from './pages/Services'
import Calculator from './pages/Calculator';



function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5000/api/auth/user", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => setUser(response.data))
    .catch(error => console.error("Error fetching user:", error));
  }, [token]);
  

  return (

    <Router>
      <Navbar user={user} />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login setToken={setToken} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/investments" element={<Investments token={token} />} />
          <Route path="/Contact" element={<Contact />} />
          <Route path="/Services" element={<Services />} />
          <Route path="/calculator" element={<Calculator />} />
        </Routes>
      </div>
      
    </Router>
  );
}
export default App;
