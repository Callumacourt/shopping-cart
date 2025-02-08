import { useProducts } from '../context/ProductContext';
import { useParams } from 'react-router-dom';
import AddToCart from '../components/Products/AddToCart';
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';

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
      <Header />
      <div className="container">
        <div className="imageContainer">
          <img src={selectedProduct.image} alt={selectedProduct.title} />
        </div>
        <div className="content">
          <h2>{selectedProduct.title}</h2>
          <p>{selectedProduct.price}</p>
          <p>{selectedProduct.description}</p>
          <AddToCart product={selectedProduct} />
        </div>
      </div>
      <Footer />
    </>
  );
}
