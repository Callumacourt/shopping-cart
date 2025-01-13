import Navbar from './Navbar';
import SearchBar from './SearchBar';
import searchIcn from '../assets/search.svg';
import cartIcn from '../assets/shopping-cart.svg';

const Header = () => {
  return (
    <>
      <header className="header">
        <h1>Pino's Pianos</h1>
        <SearchBar />
        <Navbar />
        <div className="header-icons">
          <img src={searchIcn} alt="Search" />
          <img src={cartIcn} alt="Shopping Cart" />
        </div>
      </header>
    </>
  );
};

export default Header;
