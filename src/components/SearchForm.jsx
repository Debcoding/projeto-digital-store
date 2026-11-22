import { useEffect, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { ROUTES, productsPath } from '../constants/routes.js';

/** Busca por nome: leva para /produtos?q=... e mantém o texto ao navegar. */
export default function SearchForm() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();

  const urlQuery = pathname === ROUTES.products ? params.get('q') ?? '' : '';
  const [value, setValue] = useState(urlQuery);

  useEffect(() => setValue(urlQuery), [urlQuery]);

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate(productsPath({ q: value.trim() }));
  };

  return (
    <form className="search" role="search" onSubmit={handleSubmit}>
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder="Pesquisar produto..."
        aria-label="Pesquisar produto"
        autoComplete="off"
      />
      <button type="submit" aria-label="Buscar">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="11" cy="11" r="7" />
          <path d="M20 20l-3.5-3.5" />
        </svg>
      </button>
    </form>
  );
}
