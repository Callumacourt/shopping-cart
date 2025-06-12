import App from '../components/App';
import CartPage from './CartPage';
import Store from './Store';
import AboutPage from './AboutPage';
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
      { path: 'about', element: <AboutPage /> },
      { path: 'checkout', element: <Checkout /> },
      { path: 'product/:productId', element: <ProductPage /> },
    ],
  },
];

export default routes;
