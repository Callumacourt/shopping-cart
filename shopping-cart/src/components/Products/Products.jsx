import { useProducts } from '../../context/ProductContext';
import Card from './Card';
import styles from './Products.module.css';
import filterIcn from '../../assets/filter.svg';

export default function Products() {
  const { productData, error, loading, category } = useProducts();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error {error.message}</div>;

  const filteredProducts =
    category && category.trim() !== ''
      ? productData.filter((product) => product.category === category)
      : productData;

    {console.log(filteredProducts)}

  return (
    <>
      <span className={styles.categoryHeader}>
        <h3>All Products</h3>
      </span>
      <section className={styles.filterProducts}>
        <p>{filteredProducts.length} Results</p>
        <button>Filter<img src={filterIcn} /></button>
      </section>
      <div className={styles.productContainer}>
        {filteredProducts.map((product) => (
          <Card key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
