import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CollectionBanners from '../components/CollectionBanners.jsx';
import CollectionIcons from '../components/CollectionIcons.jsx';
import Hero from '../components/Hero.jsx';
import OfferSection from '../components/OfferSection.jsx';
import ProductList from '../components/ProductList.jsx';
import QueryStatus from '../components/QueryStatus.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import { ROUTES, SECTION_COLLECTIONS } from '../constants/routes.js';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { productService } from '../services/productService.js';

export default function HomePage() {
  useDocumentTitle('Digital Store');
  const { hash } = useLocation();

  const { data: featured, status, reload } = useAsync(
    (signal) => productService.getFeatured({ limit: 8, signal }),
    [],
  );

  // "Categorias" no menu leva para /#colecoes.
  useEffect(() => {
    if (hash === `#${SECTION_COLLECTIONS}`) {
      document.getElementById(SECTION_COLLECTIONS)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [hash]);

  return (
    <>
      <Hero />
      <CollectionBanners />
      <CollectionIcons />

      <section className="section container">
        <SectionHeader title="Produtos em alta" linkTo={ROUTES.products} linkLabel="Ver todos" />
        <QueryStatus status={status} onRetry={reload}>
          <ProductList products={featured ?? []} variant="home" columns={4} />
        </QueryStatus>
      </section>

      <OfferSection />
    </>
  );
}
