import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import CartTotal from '../components/CartTotal';

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {

if (products.length > 0) {
  const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            _id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
}   
  }, [cartItems,products]);

  return (
    <div className="container my-5 pt-5">
      {/* Title Section */}
      <div className="text-center mb-4">
      <div className="text-center my-4">
  <h2 className="d-inline-flex align-items-center justify-content-center">
    <span className="bg-primary me-2" style={{  borderRadius: '50px',width: '30px', height: '3px', display: 'inline-block' }}></span>
    Cart
  </h2>
</div>
      </div>

      {/* Cart Items */}
      <div className="row">
        {cartData.map((item, index) => {
          const productData = products.find((product) => product._id === item._id);
          return (
            <div key={index} className="col-md-12 mb-3 border-bottom pb-3">
              <div className="d-flex align-items-center">
                {/* Product Image */}
                <img
                  src={productData.image[0]}
                  alt="product"
                  className="img-thumbnail me-3"
                  style={{ width: '100px', height: '100px',objectFit: 'contain' }}
                />

                {/* Product Details */}
                <div className="flex-grow-1">
                  <h5>{productData.name}</h5>
                  <p className="mb-1 text-muted">Size: {item.size}</p>
                  <p className="mb-1 text-danger">
                    {currency}
                    {productData.price}
                  </p>
                </div>

                {/* Quantity and Delete */}
                <div className="d-flex align-items-center">
                  <input
                    type="number"
                    min={1}
                    defaultValue={item.quantity}
                    onChange={(e) =>
                      e.target.value === '' || e.target.value === '0'
                        ? null
                        : updateQuantity(item._id, item.size, Number(e.target.value))
                    }
                    className="form-control me-3"
                    style={{ width: '80px' }}
                  />
                  <img
                    onClick={() => updateQuantity(item._id, item.size, 0)}
                    src={assets.bin_icon}
                    alt="delete"
                    className="img-fluid cursor-pointer"
                    style={{ width: '24px' ,cursor: "pointer",
}}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Cart Total and Checkout */}
      <div className="row mt-4">
        <div className="col-md-6 offset-md-6">
          <CartTotal />
          <div className="d-grid mt-3">
            <button
              onClick={() => navigate('/place-order')}
              className="btn btn-primary"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;