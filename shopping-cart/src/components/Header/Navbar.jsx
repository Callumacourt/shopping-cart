import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Navbar = () => {
  return (
    <>
    <nav aria-label='Main navigation'>
      <div className={styles.linksContainer}>
        <ul className={styles.navlinks}>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
        </ul>
      </div>
      </nav>
    </>
  );
};

export default Navbar;
