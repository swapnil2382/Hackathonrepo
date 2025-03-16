
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
import StockData from './pages/Stockdata';
import Profile from './pages/Profile';
import InvestmentSuggestions from './pages/InvestmentSuggestions';
import AddMoney from './pages/AddMoney';




function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {  // ✅ Ensure token exists
      axios.get("http://localhost:5000/api/auth/user", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(response => setUser(response.data))
      .catch(error => console.error("Error fetching user:", error));
    }
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
          <Route path="#contact" element={<Contact />} />
          <Route path="/calculator" element={<Calculator />} />
          <Route path="/stocks" element={<StockData />} />
          <Route path="/sugges" element={<InvestmentSuggestions/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/add-money" element={<AddMoney/>} />
          
        </Routes>
      </div>
      <Footer/>
      
    </Router>
  );
}
export default App;


