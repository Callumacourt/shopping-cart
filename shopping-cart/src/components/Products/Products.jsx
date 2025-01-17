import { useEffect, useState } from 'react';
import Card from './Card';
import styles from './Products.module.css';

const Products = () => {
  const [productData, setProductData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://fakestoreapi.com/products', { mode: 'cors' })
      .then((response) => {
        if (response.status >= 400) {
          throw new Error('server error');
        }
        return response.json();
      })
      .then((response) => setProductData(response))
      .catch((error) => setError(error))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>A network error occured</p>;

  return (
    <div className={styles.productContainer}>
      {productData
        .filter((product) => product.category.includes('clothing'))
        .map((product) => (
          <Card key={product.id} product={product} />
        ))}
    </div>
  );
};

export default Products;
