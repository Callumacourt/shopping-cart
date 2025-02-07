import { useProducts } from '../context/ProductContext';
import { useParams } from 'react-router-dom';

export default function ProductPage() {
  const { productData, error, loading } = useProducts();
  const { productId } = useParams();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  const selectedProduct = productData.find(
    (product) => product.id == productId
  );

  return (
    <div className="container">
      <h1>{selectedProduct.title}</h1>
      <img src={selectedProduct.image} alt={selectedProduct.title} />
      <p>{selectedProduct.price}</p>
    </div>
  );
}
