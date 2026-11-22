import { Link, useLocation } from 'react-router-dom';
import logoHeader from '../assets/logo-header.svg';
import miniCart from '../assets/mini-cart.svg';
import { ROUTES, SECTION_COLLECTIONS } from '../constants/routes.js';
import { useToast } from '../context/ToastContext.jsx';
import SearchForm from './SearchForm.jsx';
import '../styles/Header.css';

const scrollToCollections = () =>
  document.getElementById(SECTION_COLLECTIONS)?.scrollIntoView({ behavior: 'smooth', block: 'start' });

export default function Header() {
  const { pathname, hash } = useLocation();
  const { notifyUnavailable } = useToast();

  const onCategories = pathname === ROUTES.home && hash === `#${SECTION_COLLECTIONS}`;
  const onHome = pathname === ROUTES.home && !onCategories;
  const onProducts = pathname.startsWith(ROUTES.products);

  const linkProps = (active) => ({
    className: `nav__link${active ? ' is-active' : ''}`,
    'aria-current': active ? 'page' : undefined,
  });

  // Já está na home: apenas volta ao topo (o link para a mesma URL não rola sozinho).
  const handleHome = () => {
    if (onHome) window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Já está em /#colecoes: o hash não muda, então rola manualmente.
  const handleCategories = (event) => {
    if (onCategories) {
      event.preventDefault();
      scrollToCollections();
    }
  };

  return (
    <header className="header">
      <div className="container header__top">
        <Link to={ROUTES.home} className="logo" aria-label="Digital Store – página inicial" onClick={handleHome}>
          <img src={logoHeader} alt="Digital Store" width="253" height="44" />
        </Link>

        <SearchForm />

        <div className="header__actions">
          <button type="button" className="link-signup" onClick={() => notifyUnavailable('Cadastre-se')}>
            Cadastre-se
          </button>
          <button type="button" className="btn-login" onClick={() => notifyUnavailable('Entrar')}>
            Entrar
          </button>
          <img className="cart" src={miniCart} alt="Carrinho de compras" width="24" height="24" />
        </div>
      </div>

      <nav className="container nav" aria-label="Navegação principal">
        <Link to={ROUTES.home} onClick={handleHome} {...linkProps(onHome)}>Home</Link>
        <Link to={ROUTES.products} {...linkProps(onProducts)}>Produtos</Link>
        <Link to={ROUTES.categories} onClick={handleCategories} {...linkProps(onCategories)}>Categorias</Link>
        <button type="button" className="nav__link" onClick={() => notifyUnavailable('Meus pedidos')}>
          Meus Pedidos
        </button>
      </nav>
    </header>
  );
}
