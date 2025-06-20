import React, { useEffect, useState } from 'react';
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from '../assets/assets';

function Order({ token }) {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;
    try {
      const response = await axios.post(backendUrl + '/api/order/list', {}, { headers: { token } });
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(backendUrl + '/api/order/status', { orderId, status: event.target.value }, { headers: { token } });
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="container mt-4 pt-3">
       <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
   Order Page
  </h2>
</div>
      {orders.map((order, index) => (
        <div key={index} className="card shadow-sm mb-4 p-3">
          <div className="d-flex align-items-center mb-3">
            <img src={assets.parcel_icon} alt="Parcel Icon" className="me-3" style={{ width: '50px' }} />
            <h5 className="mb-0 text-primary  ">Order #{index + 1}</h5>
          </div>
          <div className="row">
            <div className="col-md-6">
              <h5 className="fw-bold text-uppercase my-3">Items Ordered</h5>
             <div>
  {order.items.map((item, index) => (
    <div key={index} className="border-bottom py-2 d-flex align-items-center flex-nowrap">
      <span className="text-truncate">
        {item.name} × {item.quantity}
      </span>
      <span className="badge bg-primary ms-2">{item.size}</span>
    </div>
  ))}
</div>



            </div>
            <div className="col-md-6">
              <h5 className="fw-bold text-uppercase my-3">Shipping Address</h5>
              <p className="mb-1">{order.address.fristName} {order.address.lastName}</p>
              <p className="mb-1">{order.address.street}, {order.address.city}</p>
              <p className="mb-1">{order.address.state}, {order.address.country}, {order.address.zipcode}</p>
              <p className="mb-1">Phone: {order.address.phone}</p>
            </div>
          </div>
          <div className="mt-3 row">
            <div className="col-md-6">
              <p><strong>Items:</strong> {order.items.length}</p>
              <p><strong>Method:</strong> {order.paymentMethod}</p>
              <p><strong>Payment:</strong> {order.payment ? 'Done' : 'Pending'}</p>
              <p><strong>Date:</strong> {new Date(order.date).toLocaleDateString()}</p>
              <p><strong> Price:</strong> {currency}{order.amount}</p>
            </div>
            <div className="col-md-6 text-end">
              
              <select className="form-select mt-2" value={order.status} onChange={(event) => statusHandler(event, order._id)}>
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Order;
