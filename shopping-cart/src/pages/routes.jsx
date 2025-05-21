import App from '../components/App';
import CartPage from './CartPage';
import Store from './Store';
import About from './About';
import ProductPage from './ProductPage';
import Checkout from '../components/Checkout/Components/Checkout';
import HomeHero from '../components/Hero/HomeHero'; 

const routes = [
  {
    path: '/',
    element: <App />, 
    children: [
      { index: true, element: <HomeHero /> }, 
      { path: 'cart', element: <CartPage /> },
      { path: 'store', element: <Store /> },
      { path: 'about', element: <About /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'product/:productId', element: <ProductPage /> },
    ],
  },
];

export default routes;
