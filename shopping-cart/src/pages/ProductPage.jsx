import { useProducts } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import AddToCart from '../components/Products/AddToCart';
import styles from '../components/Products/SingleProduct.module.css'
import ProductStars from '../components/Products/ProductStars';

export default function ProductPage() {
  const { productData, error, loading } = useProducts();
  const { productId } = useParams();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const selectedProduct = productData.find(
    (product) => product.id == productId
  );

  return (
    <>
    {console.log(productData)}
      <main className={styles.container}>
        <div className={styles.imgContainer}>
          <img src={selectedProduct.image} alt={selectedProduct.title} />
        </div>
        <section className={styles.content}>
          <h2>{selectedProduct.title}</h2>
          <span className={styles.ratingWrapper}>
            <ProductStars rating={selectedProduct.rating.rate}/>
            <p>{selectedProduct.rating.count} Reviews</p>
            </span>
            <span className = {styles.productInfo}>
              <p>{selectedProduct.price}</p>
              <p>{selectedProduct.description}</p>
            </span>
          <AddToCart product={selectedProduct} />
        </section>
      </main>
    </>
  );
}
