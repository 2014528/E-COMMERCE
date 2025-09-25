import React, { useContext } from 'react';
import './CartItems.css';
import { ShopContext } from '../../Context/ShopContext';
import remove_icon from '../Assets/cart_cross_icon.png';

const CartItems = () => {
  const { getTotalCartAmount, all_product, cartItems, RemoveFromCart } = useContext(ShopContext);

  return (
    <div className='cartitems'>
      
      {/* Header Row */}
      <div className="cartitems-header">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />

      {/* Product Rows */}
      {all_product.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div className="cartitems-row" key={e.id}>
              <img src={e.image} alt={e.name} className="carticon-product-icon" />
              <p>{e.name}</p>
              <p>${e.new_price}</p>
              <div className='cartitems-quantity'>{cartItems[e.id]}</div>
              <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
              <img
                className='cartitems-remove-icon'
                src={remove_icon}
                onClick={() => RemoveFromCart(e.id)}
                alt="Remove"
              />
            </div>
          );
        }
        return null;
      })}

      {/* Cart Total */}
      <div className="cartitems-total">
        <h1>CART TOTAL</h1>
        <div className="cartitems-total-tem">
          <p>Subtotal</p>
          <p>${getTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <p>Shipping Fee</p>
          <p>Free</p>
        </div>
        <hr />
        <div className="cartitems-total-item">
          <h3>Total</h3>
          <h3>${getTotalCartAmount()}</h3>
        </div>
        <button>Proceed To Checkout</button>
      </div>

      {/* Promo Code */}
      <div className="cartitems-promocode">
        <p>If you have a promo code, please enter it below</p>
        <div className="cartitems-promobox">
          <input type="text" placeholder='Enter your code here' />
          <button>Submit</button>
        </div>
      </div>

    </div>
  );
}

export default CartItems;
