import { useState } from 'react';
import Dropdown from './Dropdown';
import searchIcn from '../../assets/search.svg'
import { useProducts } from '../../context/ProductContext';
import styles from './Search.module.css';

const SearchBar = ({ mobile }) => {
  const [input, setInput] = useState('');
  const { productData } = useProducts();
  const [matches, setMatches] = useState([]);
  const [mobileExpanded, setMobileExpanded] = useState(false);

  const normalise = (str) => str.replace(/'/g, "").toLowerCase();

  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  const handleInputChange = (event) => {
    const value = event.target.value;

    setInput(value);

    if (value.length < 3) {
      setMatches([]);
      return;
    }

    const normalised = normalise(value);
    const escaped = escapeRegExp(normalised);
    const regex = new RegExp(`\\b${escaped}\\b`, 'i');
    setMatches(
      productData.filter((product) => {
        const normalisedTitle = normalise(product.title);
        return regex.test(normalisedTitle);
      })
    );
  };

  return (
    <>
      {mobile ? (
        <>
          <img
            className={styles.header_icons}
            src={searchIcn}
            alt="Open search"
            onClick={() => setMobileExpanded(true)}
          />
          {mobileExpanded && (
            <section className={styles.searchModal} aria-modal="true" role="dialog">
              <button onClick={() => setMobileExpanded(false)}>Cancel</button>
              <div className={styles.searchWrapper} role="search">
                <img
                  className={styles.header_icons}
                  src={searchIcn}
                  alt="Search"
                />
                <input
                  id="search-products"
                  aria-label="Search products"
                  aria-autocomplete="list"
                  aria-controls="search-dropdown"
                  type="text"
                  onInput={handleInputChange}
                  className={styles.searchBar}
                  value={input}
                  placeholder="Search products"
                  autoFocus
                  role="combobox"
                  aria-expanded={input.length > 0}
                />
              </div>
              {input.length > 0 && (
                <Dropdown
                  setMobileExpanded={setMobileExpanded}
                  searchTerm={input}
                  matches={matches}
                  setInput = {setInput}
                  id="search-dropdown"
                  role="listbox"
                />
              )}
            </section>
          )}
        </>
      ) : (
        <div className={styles.searchBarContainer} role="search">
          <input
            id="search-products"
            aria-label="Search products"
            aria-autocomplete="list"
            aria-controls="search-dropdown"
            placeholder="Search products"
            onInput={handleInputChange}
            className={styles.searchBar}
            type="text"
            value={input}
            role="combobox"
            aria-expanded={input.length > 0}
          />
          {input.length > 0 && (
            <Dropdown
              searchTerm={input}
              matches={matches}
              setInput={setInput}
              id="search-dropdown"
              role="listbox"
            />
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;