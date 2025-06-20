import Navbar from './Navbar';
import SearchBar from '../Search/SearchBar';
import NavDropdown from './NavDropdown';
import cartIcn from '../../assets/shopping-cart.svg';
import logo from '../../assets/logo.svg';
import styles from './header.module.css';
import { useCart } from '../../context/CartContext';
import { Link } from 'react-router-dom';
import { useMediaQuery } from 'react-responsive';

const MobileHeader = ({cartItems}) => {
  return (
  <>
  <NavDropdown/>
  <SearchBar mobile={true}/>
  <Link to="/">
    <img className={styles.logo} src={logo} alt="A dummy logo" />
  </Link>
  <Link to="/cart">
      <button className = {styles.header_icons}>
        <img className = {styles.cartIcn} src={cartIcn} alt="Shopping Cart" />
        <span>{cartItems.length}</span>
      </button>
  </Link>
  </>
  )
}


const Header = () => {
  const { cartItems } = useCart();
  const isMobile = useMediaQuery({maxWidth: 767});
  return (
    <>
      <header className={styles.header}>
          {isMobile ? (
          <MobileHeader cartItems = {cartItems}/>
        ) : (
        <>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="A dummy logo" />
          </Link>
          <SearchBar mobile={false} />
          <Navbar />
          <div className={styles.header_icons}>
            <Link to="/cart">
              <button>
                <img className = {styles.cartIcn} src={cartIcn} alt="Shopping Cart" />
                <span>{cartItems.length}</span>
              </button>
            </Link>
          </div>
        </>
      )}
      </header>
    </>
  );
};

export default Header;
