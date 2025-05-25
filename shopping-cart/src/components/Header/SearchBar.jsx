import { useState } from 'react';
import Dropdown from '../Search/Dropdown';
import searchIcn from '../../assets/search.svg'
import closeIcn from '../../assets/x.svg'
import { useProducts } from '../../context/ProductContext';
import styles from './header.module.css';

const SearchBar = ({mobile}) => {
  const [input, setInput] = useState('');
  const { productData } = useProducts();
  const [matches, setMatches] = useState([]);
  const [mobileExpanded, setMobileExpanded] = useState(false)

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
    <>
    {mobile ? (
      <>
      <img src={searchIcn} alt="A search icon" onClick={() => setMobileExpanded(true)}/>
       {mobileExpanded && (
        <section className={styles.searchModal}>
          <button onClick={() => setMobileExpanded(false)}><img src={closeIcn}></img></button>
          <input 
            type="text"
            onInput={handleInputChange}
            className={styles.searchBar}
            value={input}
          />
          {input.length > 0 ? <Dropdown matches={matches} /> : null}
        </section>
       )}
      </>
    ) : (
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
  )}
    </>
  );
};

export default SearchBar;
