import PropTypes, { arrayOf, object } from 'prop-types';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';

const cartItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.is,
});

const Cart = () => {
  const { cartItems, removeFromCart, handleQty } = useCart();

  {
    console.log(cartItems);
  }

  return (
    <>
      {cartItems.map((item, index) => (
        <div key={index}>
          <img src={item.image} alt={item.alt} />
          <p>
            <span>Item: {item.title}</span>
            <br />
            <span>Price: {item.price}</span>
            <br />
            <span>Qty: {item.qty}</span>
            <br />
            <span>Total: {(item.price * item.qty).toFixed(2)}</span>
          </p>
          <ul>
            <li>
              <button onClick={() => handleQty(item.name, '+')}>+</button>
            </li>
            <li>
              <button onClick={() => handleQty(item.name, '-')}>-</button>
            </li>
          </ul>
          <button onClick={() => removeFromCart(index)}>Remove</button>
        </div>
      ))}
      <div>
        <span>
          Subtotal:
          {cartItems
            .reduce((total, item) => total + item.price * item.qty, 0)
            .toFixed(2)}
        </span>
        <Link to="/checkout">
        <button>Checkout</button>
        </Link>
      </div>
    </>
  );
};

Cart.propTypes = {
  initialItems: PropTypes.arrayOf(cartItemShape),
};
export default Cart;
