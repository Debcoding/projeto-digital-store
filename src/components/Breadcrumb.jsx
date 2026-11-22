import { Fragment } from 'react';
import { Link } from 'react-router-dom';

/** Caminho de navegação. O último item (sem `to`) é a página atual. */
export default function Breadcrumb({ items }) {
  return (
    <nav className="breadcrumb" aria-label="Caminho">
      {items.map(({ label, to }, i) => (
        <Fragment key={label + i}>
          {i > 0 && <span aria-hidden="true">/</span>}
          {to ? (
            <Link to={to} className={i === 0 ? 'breadcrumb__first' : undefined}>{label}</Link>
          ) : (
            <span aria-current="page">{label}</span>
          )}
        </Fragment>
      ))}
    </nav>
  );
}
