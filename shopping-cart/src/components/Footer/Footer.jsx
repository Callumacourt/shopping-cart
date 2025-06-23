import styles from './Footer.module.css';
import rightArrow from '../../assets/arrow-right.svg'
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footerContainer}>
      <section className={styles.mailingList}>
        <h3>Subscribe to our mailing list</h3>
        <span className={styles.mailingWrapper}>
          <label htmlFor="footer-email" className="sr-only">Email address</label>
          <input
            id="footer-email"
            placeholder="youremail@example.com"
            type="email"
            aria-label="Email address"
            autoComplete="email"
          />
          <button aria-label="Subscribe">
            <img src={rightArrow} alt="Submit" />
          </button>
        </span>
        <small>
          By providing your email, you agree to receive
          marketing emails and accept our Privacy Policy and Terms.
        </small>
      </section>
      <section>
        <h3>Quick Links</h3>
        <nav aria-label="Footer quick links">
          <span>
            <Link to="/">Home</Link>
            <Link to="/store">Store</Link>
            <Link to="/about">About</Link>
            <p>Contact</p>
            <p>FAQs</p>
          </span>
        </nav>
      </section>
      <section>
        <h3>Contact Us</h3>
        <p>support@blahblah.com</p>
        <p>Cardiff, UK</p>
        <p>Mon - Fri: 9AM - 5PM</p>
      </section>
      <section>
        <small>© 2025 Logoipsum, all rights reserved</small>
      </section>
    </footer>
  );
};

export default Footer;
