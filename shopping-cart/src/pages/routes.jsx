import App from '../components/App';
import CartPage from './cart';
import Store from './Store';
import About from './About';
import ProductPage from './ProductPage';
import { element } from 'prop-types';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'cart',
    element: <CartPage />,
  },
  {
    path: 'store',
    element: <Store />,
    children: [],
  },
  {
    path: 'about',
    element: <About />,
  },
  {
    path: 'product/:productId',
    element: <ProductPage />,
  },
];

export default routes;
