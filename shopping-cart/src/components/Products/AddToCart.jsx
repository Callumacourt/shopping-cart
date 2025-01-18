import { useState } from 'react';
import { useCart } from '../../context/CartContext';

const AddToCart = ({ product }) => {
  const { addToCart } = useCart();
  const [qtyToAdd, setQtyToAdd] = useState(1);

  return (
    <div>
      <div>
        <button onClick={() => setQtyToAdd((prev) => Math.max(1, prev - 1))}>
          -
        </button>
        <span>{qtyToAdd}</span>
        <button onClick={() => setQtyToAdd((prev) => prev + 1)}>+</button>
      </div>
      <button
        onClick={() => {
          addToCart({ product }, qtyToAdd);
          setQtyToAdd(1);
        }}
      >
        Add to cart
      </button>
    </div>
  );
};

export default AddToCart;
