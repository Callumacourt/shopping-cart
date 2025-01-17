import PropTypes, { arrayOf, object } from 'prop-types';
import { useCart } from '../../context/CartContext';

const cartItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.is,
});

const Cart = () => {
  const { cartItems, removeFromCart, handleQty } = useCart();

  return cartItems.map((item, index) => (
    <div key={index}>
      <img src={item.src} alt={item.alt} />
      <p>
        <span>{item.name}</span>
        <span>{item.price}</span>
        <span>{item.qty}</span>
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

Cart.propTypes = {
  initialItems: PropTypes.arrayOf(cartItemShape),
};
export default Cart;
