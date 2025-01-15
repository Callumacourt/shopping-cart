import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Header/Cart';
import { CartProvider } from '../context/CartContext';
import piano from '../assets/piano1.jpg';

const mockCart = [
  {
    name: 'big old grand piano',
    price: 1000,
    qty: 1,
    src: piano,
    alt: 'a big old piano',
  },
  {
    name: 'small new piano',
    price: 500,
    qty: 4,
    src: piano,
    alt: 'a small new piano',
  },
];

const renderWithProvider = (component, initialItems = mockCart) => {
  return render(
    <CartProvider initialItems={initialItems}>{component}</CartProvider>
  );
};

describe('Cart component', () => {
  beforeEach(() => {
    const { setCartItems } = vi.fn();
  });

  it('renders cart items correctly', () => {
    renderWithProvider(<Cart />);
    expect(screen.getByText(/big old grand piano/)).toBeInTheDocument();
    expect(screen.getByText(/small new piano/)).toBeInTheDocument();
    expect(screen.getByAltText(/a small new piano/)).toBeInTheDocument();
    expect(screen.getByAltText(/a big old piano/)).toBeInTheDocument();
  });

  it('allows increasing item qty', async () => {
    renderWithProvider(<Cart />);
    const user = userEvent.setup();

    const plusButtons = screen.getAllByText('+');
    await user.click(plusButtons[0]);

    expect(screen.getByText('2')).toBeInTheDocument();
  });

  it('allows decreasing item qty', async () => {
    renderWithProvider(<Cart />);
    const user = userEvent.setup();

    const minusButtons = screen.getAllByText('-');
    await user.click(minusButtons[1]);

    expect(screen.getByText('3')).toBeInTheDocument();
  });

  it('allows removing items from the cart', async () => {
    renderWithProvider(<Cart />);
    const user = userEvent.setup();

    const removeButtons = screen.getAllByText('X');
    await user.click(removeButtons[0]);

    expect(screen.queryByText(/big old grand piano/)).not.toBeInTheDocument();
  });
});
