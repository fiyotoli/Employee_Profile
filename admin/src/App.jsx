import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Add from './pages/Add';
import List from './pages/List';
import Order from './pages/Order';
import Sidebar from './components/Sidebar';
import Login from './components/Login'; // Assuming you have a Login component
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const backendUrl = import.meta.env.VITE_BACKEND_URL
export const currency ="$";
function App() {
  

  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') :'');

  useEffect(()=>{
    localStorage.setItem('token', token)
    }, [token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? 
       <Login setToken={setToken} />
      :
        <>
          <Navbar  setToken={setToken}/>
          <hr />
          <div style={{ display: 'flex' }}>
           
            <div style={{ flex: 1 }}>
              <Routes>
                <Route path='/' element={<Add  token={token} />} />
                <Route path='/list' element={<List token={token} />} />
                <Route path='/orders' element={<Order token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  );
}

export default App;
