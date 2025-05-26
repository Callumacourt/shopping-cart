import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import styles from './Products.module.css'

const AddToCart = ({ product }) => {
  const { addFunction } = useCart();
  const [qtyToAdd, setQtyToAdd] = useState(1);

  return (
    <div className = {styles.addToCart}>
      <div className = {styles.qtyWrapper}>
        <button className = {styles.qtyBtn}
         onClick={() => setQtyToAdd((prev) => Math.max(1, prev - 1))}>
          -
        </button>
        <span>{qtyToAdd}</span>
        <button className = {styles.qtyBtn} onClick={() => setQtyToAdd((prev) => prev + 1)}>+</button>
      </div>
      <button
        className = {styles.addToCartBtn}
        onClick={() => {
          addFunction({ product, quantity: qtyToAdd });
          setQtyToAdd(1);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
