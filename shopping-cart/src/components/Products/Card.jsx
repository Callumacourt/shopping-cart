import styles from './Products.module.css';
import AddToCart from './AddToCart';
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
          <span>
            <p className={styles.productTitle}>{product.title}</p>
          </span>
          <span>
            <p>{product.price}</p>
          </span>
          <span>
            <AddToCart product={product} />
          </span>
        </div>
      </div>
    </>
  );
};

export default Card;
