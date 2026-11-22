import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import Footer from './Footer.jsx';
import Header from './Header.jsx';
import ScrollManager from './ScrollManager.jsx';

export default function Layout() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main>
        {/* Páginas carregadas sob demanda (React.lazy) mostram este fallback */}
        <Suspense fallback={<p className="page-loader" role="status">Carregando...</p>}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
