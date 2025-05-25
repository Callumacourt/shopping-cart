import styles from './SingleProduct.module.css';

const ProductStars = ({ rating }) => {
  const roundedRating = Math.round(rating * 2) / 2;
  const fullStars = Math.floor(roundedRating);
  const hasHalfStar = roundedRating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <span className={styles.rating}>
      {[...Array(fullStars)].map((_, i) => (
        <span key={`full-${i}`} className={styles.fullStar}>★</span>
      ))}
      {hasHalfStar && (
        <span key="half" className={styles.halfStar}>★</span>
      )}
      {[...Array(emptyStars)].map((_, i) => (
        <span key={`empty-${i}`} className={styles.emptyStar}>★</span>
      ))}
    </span>
  );
};

export default ProductStars;