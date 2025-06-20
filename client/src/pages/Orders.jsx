import React, { useContext, useEffect, useState } from "react";
import Title from "../components/Title";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";

function Orders() {
  const { backendUrl,token, currency} = useContext(ShopContext);

  const [orderData,setOrderData] =useState([])

const loadOrderData = async () => {
  try {
    if (!token) {
      return null;
    }
    const response = await axios.post(backendUrl + '/api/order/userorders',{},{headers:{token}})
 if (response.data.success) {
  
  let allOrdersItem = []
  response.data.orders.map((order)=>{
  order.items.map((item)=>{
   item['status'] = order.status
   item['payment'] = order.payment
   item['paymentMethod'] = order.paymentMethod
   item['date'] = order.date
   allOrdersItem.push(item)
})
  })
  setOrderData(allOrdersItem.reverse());
 }
  } catch (error) {
    
  }
}

useEffect(()=>{
loadOrderData()
},[token])
  return (
    <div className="container mt-5 pt-5 mb-2 ">
      {/* Title Section */}
      <div className="mb-4 text-center">
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
   Orders
  </h2>
</div>
      </div>

      {/* Orders List */}
      <div className="row mt-2 pt-2 mb-5">
        {orderData.map((item, index) => (
          <div key={index} className="col-md-6 col-lg-4 mb-4">
            <div className="card shadow-sm h-100 border-0 overflow-hidden">
              <div className="card-header text-center overflow-hidden">
                <img
                  src={item.image[0]}
                  alt={item.name}
                  className="card-img-top product-image"
                  style={{ objectFit: 'cover', height: 'auto', width: '50%', transition: 'transform 0.5s' }}
                />
              </div>
              <div className="card-body">
                <h5 className="card-title text-primary text-truncate">{item.name}</h5>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fw-bold">
                    {currency}
                    {item.price}
                  </p>
                  <p className="fw-bold">Quantity:{item.quantity}</p>
                  <p className="fw-bold">Size: {item.size}</p>
                </div>
                <hr />
                <p className="text-muted">
                <span className="fw-bold"> Date:</span>  <span className="">{new Date(item.date).toDateString()}</span>
                </p>
                <p className="text-muted ">
                <span className="fw-bold">Payment:</span>   <span className="">{item.paymentMethod}</span>
                </p>
              </div>
              <div className="card-footer d-flex justify-content-between align-items-center">
                <div className="text-success">
                  <i className="bi bi-check-circle"></i> {item.status}
                </div>
                <button onClick={loadOrderData} className="btn btn-primary btn-sm">
                  Track Order
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
