import { describe, it, expect, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Cart from '../components/Cart/Cart';
import { CartProvider } from '../context/CartContext';
