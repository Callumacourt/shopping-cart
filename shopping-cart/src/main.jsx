import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import routes from './pages/routes';
import { CartProvider } from './context/CartContext';
import ProductsProvider from './context/ProductContext';
import { DeliveryProvider } from './context/DeliveryContext';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const router = createBrowserRouter(routes);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <ProductsProvider>
        <DeliveryProvider>
          <RouterProvider router={router} />
        </DeliveryProvider>
      </ProductsProvider>
    </CartProvider>
  </StrictMode>
);
