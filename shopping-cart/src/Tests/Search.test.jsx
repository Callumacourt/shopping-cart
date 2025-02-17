import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import SearchBar from '../components/Header/SearchBar';
import * as ProductContext from '../context/ProductContext';

describe('Search bar', () => {
  beforeEach(() => {
    const mockProducts = [
      { id: 1, title: 'Mens Shirt' },
      { id: 2, title: 'Mens Shoes' },
      { id: 3, title: 'Womens shirt' },
      { id: 4, title: 'a spiders shoes' },
    ];

    vi.spyOn(ProductContext, 'useProducts').mockReturnValue({
      productData: mockProducts,
    });
  });

  it('should render correctly', () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );
    const searchBarElement = screen.getByPlaceholderText(/searchbar/);
    expect(searchBarElement).toBeInTheDocument();
  });

  it('should return matching items to the drop down', async () => {
    render(
      <MemoryRouter>
        <SearchBar />
      </MemoryRouter>
    );

    const searchBarElement = screen.getByPlaceholderText(/searchbar/);
    await userEvent.type(searchBarElement, 'mens');
    const dropdownItems = screen.getAllByText(/mens/i);
    expect(dropdownItems.length).toBeGreaterThan(0);
  });
});
