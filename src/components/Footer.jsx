import { memo } from 'react';
import { Link } from 'react-router-dom';
import logoFooter from '../assets/logo-footer.svg';
import facebook from '../assets/facebook.svg';
import instagram from '../assets/instagram.svg';
import twitter from '../assets/twitter.svg';
import { CATEGORIES } from '../constants/catalog.js';
import { ROUTES, productsPath } from '../constants/routes.js';
import { CONTACT, INFO_LINKS, SOCIAL_LINKS } from '../constants/site.js';
import '../styles/Footer.css';

const SOCIAL_ICONS = { facebook, instagram, twitter };

function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Link to={ROUTES.home} className="logo" aria-label="Digital Store – página inicial">
            <img src={logoFooter} alt="Digital Store" width="253" height="44" />
          </Link>
          <p className="footer__text">
            Estilo, conforto e novas possibilidades para todos os seus passos. Encontre a sua próxima combinação na
            Digital Store.
          </p>
          <div className="footer__social">
            {SOCIAL_LINKS.map(({ name, href, icon }) => (
              <a key={name} href={href} target="_blank" rel="noopener noreferrer" aria-label={name}>
                <img src={SOCIAL_ICONS[icon]} alt="" width="24" height="24" />
              </a>
            ))}
          </div>
        </div>

        <nav className="footer__col" aria-label="Informação">
          <h4>Informação</h4>
          <ul>
            {INFO_LINKS.map((label) => (
              <li key={label}>
                <Link to={ROUTES.comingSoon}>{label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav className="footer__col" aria-label="Categorias">
          <h4>Categorias</h4>
          <ul>
            {CATEGORIES.map(({ slug, name }) => (
              <li key={slug}>
                <Link to={productsPath({ tipo: slug })}>{name}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="footer__col">
          <h4>Contato</h4>
          <address>
            <p>{CONTACT.address}</p>
            <p>{CONTACT.phone}</p>
          </address>
        </div>
      </div>

      <div className="container footer__bottom">
        <hr />
        <p>© {new Date().getFullYear()} Digital Store</p>
      </div>
    </footer>
  );
}

export default memo(Footer);
