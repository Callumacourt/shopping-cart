import styles from './Products.module.css';
import AddToCart from './AddToCart';

const Card = ({ product }) => {
  return (
    <div className={styles.card}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImg}
          src={product.image}
          alt={product.title}
        />
      </div>
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
  );
};

export default Card;
