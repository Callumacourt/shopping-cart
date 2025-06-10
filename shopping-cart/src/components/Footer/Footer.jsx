import styles from './Footer.module.css';
import rightArrow from '../../assets/arrow-right.svg'

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <section className = {styles.mailingList}>
        <h3>Subscribe to our mailing list</h3>
        <span className={styles.mailingWrapper}>
          <input placeholder='youremail@example.com' type="text" />
          <button><img src={rightArrow} alt="Submit" /></button>
        </span>
        <small>
          By providing your email, you agree to receive 
          marketing emails and accept our Privacy Policy and Terms.
        </small>
      </section>
      <section>
        <h3>Quick Links</h3>
        <span>
          <p>Home</p>
          <p>Shop</p>
          <p>About</p>
          <p>Contact</p>
          <p>FAQs</p>
        </span>
      </section>
      <section>
        <h3>Contact Us</h3>
        <p>support@blahblah.com</p>
        <p>Cardiff, UK</p>
        <p>Mon - Fri: 9AM - 5PM</p>
      </section>
    </div>
  );
};

export default Footer;
