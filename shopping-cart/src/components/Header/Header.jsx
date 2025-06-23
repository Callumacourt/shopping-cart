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
  <Link to="/cart" aria-label={`View shopping cart with ${cartItems.length} items`}>
      <button className = {styles.header_icons}>
        <img className = {styles.cartIcn} src={cartIcn} alt="Shopping Cart Icon" />
        <span>{cartItems.length}</span>
        <span className = 'sr-only'>items in cart</span>
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
            <Link to="/cart" aria-label= {`View shopping cart with ${cartItems.length} items`}>
              <button>
                <img className = {styles.cartIcn} src={cartIcn} alt="" aria-hidden = "true" />
                <span>{cartItems.length}</span>
                <span className = 'sr-only'>items in cart</span>
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
