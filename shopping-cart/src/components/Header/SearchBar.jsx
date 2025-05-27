import { useState } from 'react';
import Dropdown from '../Search/Dropdown';
import searchIcn from '../../assets/search.svg'
import { useProducts } from '../../context/ProductContext';
import styles from './header.module.css';

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
            <section className={styles.searchModal}>
              <button onClick={() => setMobileExpanded(false)}>Cancel</button>
              <div className={styles.searchWrapper}>
                <img
                  className={styles.header_icons}
                  src={searchIcn}
                  alt="Search"
                />
                <input
                  type="text"
                  onInput={handleInputChange}
                  className={styles.searchBar}
                  value={input}
                  placeholder="Search products"
                  autoFocus
                />
              </div>
              {input.length > 0 && (
                <Dropdown
                  setMobileExpanded={setMobileExpanded}
                  searchTerm={input}
                  matches={matches}
                />
              )}
            </section>
          )}
        </>
      ) : (
        <div className={styles.searchBarContainer}>
          <input
            placeholder="Search products"
            onInput={handleInputChange}
            className={styles.searchBar}
            type="text"
            value={input}
          />
          {input.length > 0 && <Dropdown matches={matches} />}
        </div>
      )}
    </>
  );
};

export default SearchBar;
