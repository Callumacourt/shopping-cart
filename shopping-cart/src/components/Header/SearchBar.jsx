import { useState } from 'react';
import Dropdown from '../Search/Dropdown';
import { useProducts } from '../../context/ProductContext';
import styles from './header.module.css';

const SearchBar = () => {
  const [input, setInput] = useState('');
  const { productData } = useProducts();
  const [matches, setMatches] = useState([]);

  const handleInputChange = (event) => {
    const value = event.target.value;
    setInput(value);
    setMatches(
      productData.filter((product) =>
        product.title.toLowerCase().startsWith(value.toLowerCase())
      )
    );
  };

  return (
    <div className={styles.searchBarContainer}>
      <input
        placeholder="searchbar"
        onInput={handleInputChange}
        className={styles.searchBar}
        type="text"
        value={input}
      />
      {input.length > 0 ? <Dropdown matches={matches} /> : null}
    </div>
  );
};

export default SearchBar;
