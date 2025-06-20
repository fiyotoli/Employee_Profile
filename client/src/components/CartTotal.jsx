import React, { useContext } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';

function CartTotal() {
  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);

  return (
    <div className="card p-4 shadow-sm">
      {/* Title Section */}
      <div className="mb-4 text-center">
        <span className=' lead'>Cart Total </span>
       
      </div>

      {/* Subtotal */}
      <div className="d-flex justify-content-between mb-3">
        <p className="mb-0 text-muted">Subtotal</p>
        <p className="mb-0 fw-bold">
          {currency}
          {getCartAmount()}.00
        </p>
      </div>
      <hr />

      {/* Shipping Fee */}
      <div className="d-flex justify-content-between mb-3">
        <p className="mb-0 text-muted">Shipping Fee</p>
        <p className="mb-0 fw-bold">
          {currency}
          {delivery_fee}
        </p>
      </div>
      <hr />

      {/* Total */}
      <div className="d-flex justify-content-between">
        <b>Total</b>
        <b>
          {currency}
          {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}
        </b>
      </div>
    </div>
  );
}

export default CartTotal;