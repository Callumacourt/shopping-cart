import PropTypes, { arrayOf, object } from 'prop-types';
import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import styles from './Cart.module.css'
import trashIcn from '../../assets/trash-2.svg'
import heartIcn from '../../assets/heart.svg'
import redHeart from '../../assets/redHeart.svg'

const cartItemShape = PropTypes.shape({
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  qty: PropTypes.number.isRequired,
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.is,
});

const Cart = () => {
  const { cartItems, removeFromCart, setQty } = useCart();

  const cartTotal = 
    cartItems.
      reduce((total, item) => total + item.price * item.qty, 0)
      .toFixed(2)

  const [likedItems, setLikedItems] = useState(() => {
    const initialLikes = {};
    cartItems.forEach((item) => {
      initialLikes[item.id] = false;
    }
  );
  return initialLikes;
});

const toggleLike = (id) => {
  setLikedItems(prev => ({
    ...prev, 
    [id] : !prev[id]
  }))
}

  return (
    <>
      <div className={styles.cartWrapper}>
      <h3>Your bag ({cartItems.length})</h3>
      <main className={styles.cart}>
        <div className={styles.cartItems}>
      {cartItems.map((item, index) => (
        <article className = {styles.checkoutCard} key={index}>
          <div className={styles.imgWrapper}>
            <img src={item.image} alt={item.alt} />
          </div>
          <div className= {styles.contentWrapper}>
            <p>
              <span className = {styles.cardUpper}>
                <p className = {styles.itemTitle}>{item.title}</p>
                <p>£{(item.price * item.qty).toFixed(2)}</p>
              </span>
              <br />
              </p>
              <span>£{item.price.toFixed(2)}</span>
              <br />
            <div className={styles.selectWrapper}>
              <select 
              name="qtySelect" 
              id="qtySelect"
              value = {item.qty}
              onChange={e => setQty({itemTitle: item.title, amount : Number(e.target.value)})}
              aria-label={`Select quantity for ${item.title}`}
              >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>{i + 1}</option>
                  ))}
              </select>
            </div>
            <span className = {styles.editSection}>
              <p>Save for later</p>
              <button>
                <img 
                src={likedItems[item.id] ? redHeart : heartIcn}
                onClick={() => toggleLike(item.id)}
                alt='Heart icon'
                />
              </button>
              <button onClick={() => removeFromCart(index)}><img src={trashIcn}/></button>
            </span>
            </div>
        </article>
      ))}
      </div>
      <section className={styles.cartEnd} >
        {cartItems.length > 0 ? (
        <>
        <section className={styles.orderSummary}>
          <h2>Order Summary</h2>
          <span>
          <p>Subtotal ({cartItems.length})</p>
          <p>Qty</p>
          <p>Price</p>
          </span>
          <span>
            <div className={styles.items}>
            {cartItems.map((item) => (
              <span>
                <p>{item.title}</p>
                <p>{item.qty}</p>
                <p>£{item.price}</p>
              </span>
          ))}
          </div>
          </span>
          <p><b>Estimated Shipping: FREE</b></p>
          <hr />
          <p><b>Estimated Total £{cartTotal}</b></p>
        </section>
          <Link to="/checkout">
          <button>Checkout</button>
          </Link>
        </>
        ) : (
          <>
          <p>Looks like your basket is empty</p>
          <Link to='/store'>Continue shopping</Link>
          </>
        )}
      </section>
      </main>
    </div>
    </>
  );
};

Cart.propTypes = {
  initialItems: PropTypes.arrayOf(cartItemShape),
};
export default Cart;
