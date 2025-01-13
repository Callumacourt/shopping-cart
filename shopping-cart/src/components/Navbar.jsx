import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <>
      <div>
        <ul>
          <li>
            <Link to="cart">Cart</Link>
          </li>
          <li>
            <Link to="store">Store</Link>
          </li>
          <li>
            <Link to="about">About us</Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;
