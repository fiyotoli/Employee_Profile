import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { toast } from 'react-toastify';
import axios from 'axios';

const Login = () => {
  const [currentState, setCurrentState] = useState('login');
  const { setToken,token,navigate,backendUrl} = useContext(ShopContext);

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const onSubmitHandler = async (event) => {
    event.preventDefault();
   try {
     
    if (currentState==='sign up') {
      const response = await axios.post(backendUrl + '/api/user/register',{name,email,password})

      if (response.data.success) {
        setToken(response.data.token)
        localStorage.setItem('token',response.data.token)
      }
      else{
        toast.error(response.data.message)
      }
    }
    else{
      const response = await axios.post(backendUrl + '/api/user/login',{email,password})
if (response.data.success) {
  setToken(response.data.token)
  localStorage.setItem('token',response.data.token)
}
else{
  toast.error(response.data.message)
}
    }
   } catch (error) {
    console.log(error)
    toast.error(error.message)
   }
  };

 useEffect(() => {
    if (token) {
      navigate('/')
    }
  }, [token]);


  return (
    <div className="container d-flex justify-content-center align-items-center  my-5 pt-5">
      <form onSubmit={onSubmitHandler} className=" col-md-8 mt-5 p-4 border rounded shadow-sm">
      <div className="text-center my-4">
      <h3 className="d-inline-flex align-items-center justify-content-center">
        <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>

          {currentState === 'login' ? 'Login' : 'Sign Up'}</h3>
</div>
        
        
        
        <div className="mb-3">
          <p>{currentState === 'login' ? 'Login to your account' : 'Create a new account'}</p>
          <hr />
        </div>
        
        {currentState === 'sign up' && (
          <div className="mb-3">
            <input onChange={(e)=>setName(e.target.value)} value={name} type="text" className="form-control" placeholder="Name" required />
          </div>
        )}
        
        <div className="mb-3">
          <input onChange={(e)=>setEmail(e.target.value)} value={email} type="email" className="form-control" placeholder="Email" required />
        </div>
        
        <div className="mb-3">
          <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="form-control" placeholder="Password" required />
        </div>
        
        <div className="mb-3 d-flex justify-content-between align-items-center">
          <p className="m-0 ">
            {currentState === 'login' ? (
              <span>Forgot password?</span>
            ) : (
              <span>Already have an account?</span>
            )}
          </p>
          
          <p
            className="text-primary m-0 "
            style={{ cursor: 'pointer' }}
            onClick={() => setCurrentState(currentState === 'login' ? 'sign up' : 'login')}
          >
            {currentState === 'login' ? 'Create Account' : 'Login Here'}
          </p>
        </div>
        
        <button type="submit" className="btn btn-primary w-100 mt-3">
          {currentState === 'login' ? 'Sign In' : 'Sign Up'}
        </button>
      </form>
    </div>
  );
};

export default Login;
