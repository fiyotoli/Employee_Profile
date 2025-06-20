
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
 
 const backendUrl = import.meta.env.VITE_BACKEND_URL
 
  const [token, setToken] = useState('');
  const navigate = useNavigate();

 

  const value = {
   
    navigate,backendUrl,setToken,token
  };

  return (
    <ShopContext.Provider value={value}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;