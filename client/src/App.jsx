import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';

import About from './pages/About';

import Orders from './pages/Orders';
import Login from './pages/login';
import Product from './pages/Product';
import Cart from './pages/Cart';
import PlaceOrder from './pages/PlaceOrder';
import Navbar from './components/Navbar';
import SearchBar from './components/SearchBar';
import { ToastContainer, toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Verify from './pages/Verify';
import { FaArrowAltCircleUp } from 'react-icons/fa';
import Footer from './components/Footer';

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
      // Simulating a loading delay (e.g., for data fetching)
      const timer = setTimeout(() => {
          setLoading(false);
      }, 1000); // Adjust the time as needed

      return () => clearTimeout(timer);
  }, []);

  const scrollToTop = () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div>
      <Navbar />

      {loading ? (
        <div className="d-flex justify-content-center align-items-center flex-column" style={{ height: '100vh' }}>
          <div className="d-flex justify-content-center gap-2">
            {/* First Spinner Button */}
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span className="visually-hidden" role="status">Loading...</span>
            </button>
            {/* Second Spinner Button */}
            <button className="btn btn-primary" type="button" disabled>
              <span className="spinner-grow spinner-grow-sm" aria-hidden="true"></span>
              <span role="status">Loading...</span>
            </button>
          </div>
        </div>
      ) : (
        <>
          <ToastContainer />
          
          <Routes>
            <Route path='/' element={<Home />} />
            
            <Route path='/about' element={<About />} />
            
            <Route path='/product/:productId' element={<Product />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/login' element={<Login />} />
            <Route path='/place-order' element={<PlaceOrder />} />
            <Route path='/orders' element={<Orders />} />
            <Route path='/verify' element={<Verify />} />
          </Routes>

          <button
            onClick={scrollToTop}
            className="btn btn-primary"
            style={{
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              display: loading ? 'none' : 'block' // Hide when loading
            }}
          >
            <FaArrowAltCircleUp />
          </button>
          {/* <Footer/> */}
        </>
      )}
    </div>
  );
}

export default App;
