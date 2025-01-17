import Navbar from './Navbar';
import SearchBar from './SearchBar';
import searchIcn from '../../assets/search.svg';
import cartIcn from '../../assets/shopping-cart.svg';
import logo from '../../assets/logo.svg';
import styles from './header.module.css';
import { useCart } from '../../context/CartContext';

const Header = () => {
  const { cartItems } = useCart();
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
            <span>{cartItems.length}</span>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
