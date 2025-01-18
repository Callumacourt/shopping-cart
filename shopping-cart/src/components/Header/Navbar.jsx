import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Navbar = () => {
  return (
    <>
      <div className={styles.linksContainer}>
        <ul className={styles.navlinks}>
          <li>
            <Link to="/cart">Cart</Link>
          </li>
          <li>
            <Link to="/store">Store</Link>
          </li>
          <li>
            <Link to="/about">About us</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
