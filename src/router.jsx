import { lazy } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import HomePage from './pages/HomePage.jsx';
import StatusPage from './pages/StatusPage.jsx';

// Carregadas sob demanda: o JavaScript dessas páginas só é baixado quando visitadas.
const ProductsPage = lazy(() => import('./pages/ProductsPage.jsx'));
const ProductPage = lazy(() => import('./pages/ProductPage.jsx'));

export const router = createBrowserRouter(
  [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, element: <HomePage /> },
        { path: 'produtos', element: <ProductsPage /> },
        { path: 'produtos/:productId', element: <ProductPage /> },
        { path: 'em-breve', element: <StatusPage title="Em breve" text="Esta página ainda não está disponível." /> },
        { path: '*', element: <StatusPage title="Página não encontrada" text="O endereço acessado não existe." /> },
      ],
    },
  ],
  { basename: import.meta.env.BASE_URL },
);
