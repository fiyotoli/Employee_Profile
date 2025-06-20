import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { FaCcStripe } from "react-icons/fa";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";
import axios from "axios";


const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);
  const [formData, setFormData] = useState({
    fristName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: ''
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setFormData(data => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {
      let orderItems = [];
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item;
              itemInfo.quantity = cartItems[items][item];
              orderItems.push(itemInfo);
            }
          }
        }
      }
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      };

      switch (method) {
        // API call for Cash on Delivery
        case 'cod':
          const response = await axios.post(backendUrl + '/api/order/place', orderData, { headers: { token } });
          console.log(response.data);
          if (response.data.success) {
            setCartItems({});
            navigate('/orders');
          } else {
            toast.error(response.data.message);
          }
          break;

          case 'stripe':
            const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, { headers: { token } });
            if (responseStripe.data.success) {
              const {session_url}=responseStripe.data
              window.location.replace(session_url)
             
             
            } else {
              toast.error(responseStripe.data.message);
            }
       


          break;

        default:
          break;
      }
    } catch (error) {
      console.error("Error placing the order:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className="container mt-5 pt-5 mb-4">
      <div className="row  mt-5">
        {/* Left Section */}
        <div className="col-md-6">
          <div className="text-left my-4">
            <h2 className="d-inline-flex align-items-center justify-content-center">
              <span
                className="bg-primary me-2"
                style={{
                  borderRadius: '50px',
                  width: '30px',
                  height: '3px',
                  display: 'inline-block',
                }}
              ></span>
              Delivery Information
            </h2>
          </div>
          <div className="mt-3">
            <div className="row mb-3">
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="fristName"
                  value={formData.fristName}
                  type="text"
                  className="form-control"
                  placeholder="First Name"
                />
              </div>
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="lastName"
                  value={formData.lastName}
                  type="text"
                  className="form-control"
                  placeholder="Last Name"
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                required
                onChange={onChangeHandler}
                name="email"
                value={formData.email}
                type="email"
                className="form-control"
                placeholder="Email"
              />
            </div>
            <div className="mb-3">
              <input
                required
                onChange={onChangeHandler}
                name="street"
                value={formData.street}
                type="text"
                className="form-control"
                placeholder="Street"
              />
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="city"
                  value={formData.city}
                  type="text"
                  className="form-control"
                  placeholder="City"
                />
              </div>
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="state"
                  value={formData.state}
                  type="text"
                  className="form-control"
                  placeholder="State"
                />
              </div>
            </div>
            <div className="row mb-3">
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="zipcode"
                  value={formData.zipcode}
                  type="number"
                  className="form-control"
                  placeholder="Zipcode"
                />
              </div>
              <div className="col">
                <input
                  required
                  onChange={onChangeHandler}
                  name="country"
                  value={formData.country}
                  type="text"
                  className="form-control"
                  placeholder="Country"
                />
              </div>
            </div>
            <div className="mb-3">
              <input
                required
                onChange={onChangeHandler}
                name="phone"
                value={formData.phone}
                type="number"
                className="form-control"
                placeholder="Phone Number"
              />
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="col-md-6">
          <CartTotal />
          <div className="mt-4">
            <Title text1="Payment" text2="Method" />
            <div className="d-flex flex-column align-items-start mt-3">
              {/* Stripe Option */}
             
<div
  className={`border p-3 mb-2 d-flex align-items-center gap-2 ${method === "stripe" ? "bg-success text-white" : "bg-white"}`}
  onClick={() => setMethod("stripe")}
  style={{ cursor: "pointer" }}
>
  <FaCcStripe size={32} />
  <span className="fw-bold">Pay with Stripe</span>
</div>
              {/* Razorpay Option */}
              
              {/* Cash on Delivery Option */}
              <div
                className={`border p-3 mb-2 ${method === "cod" ? "bg-success text-white" : ""}`}
                onClick={() => setMethod("cod")}
                style={{ cursor: "pointer" }}
              >
                <p className="mb-0">Cash on Delivery</p>
              </div>
            </div>
            <div className="mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default PlaceOrder;
