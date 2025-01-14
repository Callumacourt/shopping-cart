import { useState } from 'react';
import PropTypes from 'prop-types';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleQty = (itemName, direction) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name === itemName
          ? {
              ...item,
              qty: direction === '+' ? item.qty + 1 : Math.max(item.qty - 1, 0),
            }
          : item
      )
    );
  };

  return cartItems.map((item, index) => (
    <div key={index}>
      <img src={item.src} alt={item.alt} />
      <p>
        {item.name}
        {item.price}
        {item.qty}
      </p>
      <ul>
        <li>
          <button onClick={() => handleQty(item.name, '+')}>+</button>
        </li>
        <li>
          <button onClick={() => handleQty(item.name, '-')}>-</button>
        </li>
      </ul>
      <button
        onClick={() => {
          removeFromCart(index);
        }}
      >
        X
      </button>
    </div>
  ));
};

Cart.PropTypes = {
  initialItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      qty: PropTypes.number.isRequired,
      src: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ),
};

Cart.defaultProps = {
  initialItems: [],
};

export default Cart;
