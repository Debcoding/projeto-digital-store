import { Link } from 'react-router-dom';

/** Título de seção com link opcional à direita (ex.: "Ver todos →"). */
export default function SectionHeader({ title, linkTo, linkLabel }) {
  return (
    <header className={`section__header${linkTo ? ' section__header--between' : ''}`}>
      <h2 className="section__title">{title}</h2>
      {linkTo && (
        <Link to={linkTo} className="section__link">
          {linkLabel} <span aria-hidden="true">→</span>
        </Link>
      )}
    </header>
  );
}
