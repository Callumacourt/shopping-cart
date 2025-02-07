import { useProducts } from '../../context/ProductContext';
import Card from './Card';
import styles from './Products.module.css';

export default function Products() {
  const { productData, error, loading } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error {error.message}</div>;

  return (
    <div className={styles.productContainer}>
      {productData
        .filter((product) => product.category.includes('clothing'))
        .map((product) => (
          <Card key={product.id} product={product} />
        ))}
    </div>
  );
}
