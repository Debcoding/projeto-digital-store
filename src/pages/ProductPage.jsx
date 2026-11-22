import { useParams } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb.jsx';
import OptionPicker from '../components/OptionPicker.jsx';
import ProductGallery from '../components/ProductGallery.jsx';
import ProductList from '../components/ProductList.jsx';
import QueryStatus from '../components/QueryStatus.jsx';
import SectionHeader from '../components/SectionHeader.jsx';
import starIcon from '../assets/star-icon.svg';
import { COLORS, RATING, SIZES, categoryName } from '../constants/catalog.js';
import { ROUTES, productsPath } from '../constants/routes.js';
import { useToast } from '../context/ToastContext.jsx';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { productService } from '../services/productService.js';
import { formatPrice } from '../utils/format.js';
import StatusPage from './StatusPage.jsx';
import '../styles/ProductPage.css';

function ProductDetails({ product, related }) {
  const { notify } = useToast();
  const typeName = categoryName(product.type) || 'Produtos';

  const breadcrumb = [
    { label: 'Home', to: ROUTES.home },
    { label: 'Produtos', to: ROUTES.products },
    { label: typeName, to: productsPath({ tipo: product.type }) },
    { label: product.brand, to: productsPath({ tipo: product.type, marca: product.brand }) },
    { label: product.name },
  ].filter((item) => item.label);

  return (
    <div className="pdp">
      <div className="container">
        <Breadcrumb items={breadcrumb} />

        <div className="pdp__main">
          <ProductGallery images={product.images} initialImage={product.image} alt={product.name} />

          <div className="buybox">
            <h1 className="buybox__name">{product.name}</h1>
            <p className="buybox__ref">{typeName} | REF:{product.id}</p>

            <div className="rating">
              <span className="rating__stars" aria-hidden="true">★★★★★</span>
              <span className="rating__badge">
                {RATING.score} <img src={starIcon} alt="" width="12" height="12" />
              </span>
              <span className="rating__count">({RATING.count} avaliações)</span>
            </div>

            <div className="buybox__prices">
              <b className="buybox__price">{formatPrice(product.salePrice ?? product.price)}</b>
              {product.salePrice != null && <s className="buybox__old">{formatPrice(product.price)}</s>}
            </div>

            <h2 className="buybox__label">Descrição do produto</h2>
            <p className="buybox__desc">
              Estilo e conforto para acompanhar o seu dia. Um visual versátil para combinar com suas peças favoritas e
              aproveitar cada passo. Imagens ilustrativas do catálogo demonstrativo.
            </p>

            <OptionPicker label="Tamanho" options={SIZES} variant="square" />
            <OptionPicker label="Cor" options={COLORS} variant="circle" />

            <button type="button" className="buybox__cta" onClick={() => notify('A compra não está disponível ainda.')}>
              COMPRAR
            </button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="container related">
          <SectionHeader title="Produtos recomendados" linkTo={ROUTES.products} linkLabel="Ver todos" />
          <ProductList products={related} variant="related" columns={4} />
        </section>
      )}
    </div>
  );
}

export default function ProductPage() {
  const { productId } = useParams();

  const { data: product, status, error, reload } = useAsync(
    (signal) => productService.getById(productId, { signal }),
    [productId],
  );
  // Recomendados são independentes: a página aparece sem esperar por eles.
  const { data: related } = useAsync((signal) => productService.getRelated(productId, { signal }), [productId]);

  useDocumentTitle(product ? `${product.name} – Digital Store` : 'Digital Store');

  if (status === 'error' && error?.status === 404) {
    return <StatusPage title="Produto não encontrado" text="Não encontramos o produto que você procura." />;
  }

  return (
    <QueryStatus status={status} onRetry={reload}>
      {/* key: ao trocar de produto, galeria e opções começam do zero */}
      {product && <ProductDetails key={product.id} product={product} related={related ?? []} />}
    </QueryStatus>
  );
}
