import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart/Cart';
import { CartProvider } from '../context/CartContext';
import piano from '../assets/piano1.jpg';

describe('Shopping Cart', () => {
  const setupCart = (
    initialItems = [
      {
        title: 'big old grand piano',
        price: 1000,
        qty: 1,
        src: piano,
        alt: 'a big old piano',
      },
      {
        title: 'small new piano',
        price: 500,
        qty: 4,
        src: piano,
        alt: 'a small new piano',
      },
    ]
  ) => {
    render(
      <CartProvider initialItems={initialItems}>
        <Cart />
      </CartProvider>
    );
    return userEvent.setup();
  };

  const findText = (inputText) => screen.getByText(inputText, { exact: false });

  describe('when viewing the cart', () => {
    it('shows all items with their details', () => {
      setupCart();

      // Check if user can see their items
      expect(screen.getByText(/big old grand piano/)).toBeInTheDocument();
      expect(screen.getByText(/small new piano/)).toBeInTheDocument();

      // Check if images are accessible
      expect(screen.getByAltText(/a small new piano/)).toBeInTheDocument();
      expect(screen.getByAltText(/a big old piano/)).toBeInTheDocument();
    });

    it('displays the total cost of all items', () => {
      setupCart();
      expect(findText('3000.00')).toBeInTheDocument();
    });
  });

  describe('when managing cart items', () => {
    it('lets users add more of an item', async () => {
      const user = setupCart();

      // When user clicks + button on first item
      await user.click(screen.getAllByText('+')[0]);

      // Then quantity should increase
      expect(screen.getByText('Qty: 2')).toBeInTheDocument();
    });

    it('lets users reduce item quantity', async () => {
      const user = setupCart();

      // When user clicks - button on second item
      await user.click(screen.getAllByText('-')[1]);

      // Then quantity should decrease
      expect(screen.getByText('Qty: 3')).toBeInTheDocument();
    });

    it('lets users remove items entirely', async () => {
      const user = setupCart();

      // When user removes the first item
      await user.click(screen.getAllByText('Remove')[0]);

      // Then that item should no longer be visible
      expect(screen.queryByText(/big old grand piano/)).not.toBeInTheDocument();
    });
  });
});
