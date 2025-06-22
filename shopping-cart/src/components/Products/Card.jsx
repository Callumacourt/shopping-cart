import styles from './Products.module.css';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  // Capitalise the first letter of each word in the category
  const capitalisedCategory = product.category
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return (
    <>
      <div className={styles.card}>
        <Link to={`/product/${product.id}`}
        onClick={() => {
          sessionStorage.setItem('storeScroll', window.scrollY)
          window.scrollTo(0, 0)
        }}
        >
          <div className={styles.imgWrapper}>
            <img
              className={styles.productImg}
              src={product.image}
              alt={product.title}
            />
          </div>
        </Link>
        <div className={styles.productData}>
          <span className={styles.productHeader}>
            <p className={styles.productTitle}>{product.title}</p>
            <p><i>{capitalisedCategory}</i></p>
          </span>
          <span className={styles.priceContainer}>
            <p><b>£{product.price}</b></p>
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
