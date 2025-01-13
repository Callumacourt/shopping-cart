import App from '../components/App';
import Cart from './cart';
import Store from './Store';
import About from './About';

const routes = [
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'cart',
    element: <Cart />,
  },
  {
    path: 'store',
    element: <Store />,
  },
  {
    path: 'about',
    element: <About />,
  },
];

export default routes;
