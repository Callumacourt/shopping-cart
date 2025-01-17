import styles from './Products.module.css';

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
      </div>
    </div>
  );
};

export default Card;
