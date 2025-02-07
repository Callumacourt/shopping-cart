import { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export function CartProvider({ children, initialItems = [] }) {
  const [cartItems, setCartItems] = useState(initialItems);

  const removeFromCart = (index) => {
    setCartItems((prevItems) => prevItems.filter((_, i) => i !== index));
  };

  const handleQty = (itemName, direction) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.name == itemName
          ? {
              ...item,
              qty: direction == '+' ? item.qty + 1 : Math.max(item.qty - 1, 0),
            }
          : item
      )
    );
  };

  const addFunction = ({ product, quantity = 1 }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find(
        (item) => item.title === product.title
      );

      if (existingItem) {
        return prevItems.map((item) =>
          item.title === product.title
            ? {
                ...item,
                qty: item.qty + quantity,
              }
            : item
        );
      }
      return [...prevItems, { ...product, qty: quantity }];
    });
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        removeFromCart,
        addFunction,
        handleQty,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
