import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import 'bootstrap/dist/js/bootstrap.bundle.min.js'; // Import Bootstrap JS bundle
import 'bootstrap-icons/font/bootstrap-icons.css';

import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './context/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
    <ShopContextProvider>
    <App />
    </ShopContextProvider>
   
    </BrowserRouter>
  
  </StrictMode>,
)
