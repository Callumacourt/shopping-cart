import styles from './header.module.css';

const SearchBar = () => {
  return (
    <>
      <input className={styles.searchBar} type="text" />
    </>
  );
};

export default SearchBar;
