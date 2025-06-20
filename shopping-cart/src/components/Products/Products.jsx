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


  const capitalisedCategory = category 
  ? category
  .split(' ')
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(' ')
  : 'All Products';

  return (
    <>
      <span className={styles.categoryHeader}>
        <h3>{capitalisedCategory}</h3>
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
