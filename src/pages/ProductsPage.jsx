import { useCallback, useMemo } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import FilterSidebar from '../components/FilterSidebar.jsx';
import ProductList from '../components/ProductList.jsx';
import { SORT_OPTIONS, categoryName } from '../constants/catalog.js';
import { ROUTES } from '../constants/routes.js';
import { useAsync } from '../hooks/useAsync.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import { productService } from '../services/productService.js';
import { formatCount } from '../utils/format.js';
import { parseFilters, serializeFilters } from '../utils/filters.js';
import '../styles/ProductsPage.css';

function buildHeading(filters) {
  if (filters.search) return `Resultados para “${filters.search}”`;
  const typeName = categoryName(filters.type);
  if (typeName) return filters.brands.length === 1 ? `${typeName} ${filters.brands[0]}` : typeName;
  return 'Todos os produtos';
}

/**
 * Listagem + filtros. Todo o estado dos filtros vive na URL (?tipo=&marca=...):
 * links diretos, botão "voltar" e recarregar a página funcionam sem código extra,
 * e o mesmo objeto de filtros será enviado ao back-end.
 */
export default function ProductsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const queryKey = searchParams.toString();
  const filters = useMemo(() => parseFilters(searchParams), [queryKey]); // eslint-disable-line react-hooks/exhaustive-deps

  const { data, status, reload } = useAsync(
    (signal) => productService.list(filters, { signal }),
    [queryKey],
    { keepPreviousData: true },
  );

  const heading = buildHeading(filters);
  useDocumentTitle(`${heading} – Digital Store`);

  // Atualiza a URL sem empilhar uma entrada de histórico por clique.
  const updateFilters = useCallback(
    (updater) => setSearchParams((prev) => serializeFilters(updater(parseFilters(prev))), { replace: true }),
    [setSearchParams],
  );

  const handleToggle = useCallback(
    (key, value) =>
      updateFilters((f) => {
        if (key === 'condition') return { ...f, condition: value };
        const current = f[key];
        return { ...f, [key]: current.includes(value) ? current.filter((v) => v !== value) : [...current, value] };
      }),
    [updateFilters],
  );

  const handleClear = useCallback(
    () => updateFilters((f) => ({ ...f, brands: [], categories: [], genders: [], condition: '' })),
    [updateFilters],
  );

  const handleSort = (event) => updateFilters((f) => ({ ...f, sort: event.target.value }));

  const items = data?.items ?? [];

  return (
    <section className="container listing">
      <div className="listing__top">
        <p className="listing__title">
          <strong>{heading}</strong>
          {data && <> - <span>{formatCount(data.total)}</span></>}
        </p>
        <label className="sort">
          <span>Ordenar por:</span>
          <select value={filters.sort} onChange={handleSort}>
            {SORT_OPTIONS.map(({ value, label }) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
        </label>
      </div>

      <div className="listing__body">
        <FilterSidebar filters={filters} onToggle={handleToggle} onClear={handleClear} />

        <div className="listing__results" aria-busy={status === 'loading'}>
          {status === 'error' && (
            <div className="empty">
              <p>Não foi possível carregar os produtos.</p>
              <button type="button" className="btn-primary" onClick={reload}>Tentar novamente</button>
            </div>
          )}
          {status === 'loading' && !data && <p className="state-msg" role="status">Carregando...</p>}
          {data && items.length > 0 && <ProductList products={items} variant="listing" columns={3} />}
          {data && items.length === 0 && (
            <div className="empty">
              <p>Nenhum produto encontrado.</p>
              <Link to={ROUTES.products} className="btn-primary">Ver todos os produtos</Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
