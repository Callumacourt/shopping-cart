import styles from './Products.module.css';
import { Link } from 'react-router-dom';

const Card = ({ product }) => {
  return (
    <>
      <div className={styles.card}>
        <Link to={`/product/${product.id}`}>
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
            <p><i>{product.category}</i></p>
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
