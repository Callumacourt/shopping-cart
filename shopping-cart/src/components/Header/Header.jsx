import Navbar from './Navbar';
import SearchBar from './SearchBar';
import searchIcn from '../../assets/search.svg';
import cartIcn from '../../assets/shopping-cart.svg';
import logo from '../../assets/logo.svg';
import styles from './header.module.css';

const Header = () => {
  return (
    <>
      <header className={styles.header}>
        <img className={styles.logo} src={logo} alt="A dummy logo" />
        <SearchBar />
        <Navbar />
        <div className={styles.header_icons}>
          <button>
            <img src={searchIcn} alt="Search" />
          </button>
          <button>
            <img src={cartIcn} alt="Shopping Cart" />
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
