import { memo } from 'react';
import { Link } from 'react-router-dom';
import { CATEGORIES } from '../constants/catalog.js';
import { SECTION_COLLECTIONS, productsPath } from '../constants/routes.js';
import { CATEGORY_ICONS } from './CategoryIcons.jsx';
import SectionHeader from './SectionHeader.jsx';
import '../styles/CollectionIcons.css';

/** Ícones de categorias: cada um abre /produtos já filtrado por aquele tipo. */
function CollectionIcons() {
  return (
    <section className="section section--center container" id={SECTION_COLLECTIONS}>
      <SectionHeader title="Coleções em destaque" />
      <ul className="categories">
        {CATEGORIES.map(({ slug, name }, i) => {
          const Icon = CATEGORY_ICONS[slug];
          return (
            <li key={slug}>
              <Link to={productsPath({ tipo: slug })} className={`category${i === 0 ? ' is-featured' : ''}`}>
                <span className="category__icon"><Icon /></span>
                <span className="category__name">{name}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export default memo(CollectionIcons);
