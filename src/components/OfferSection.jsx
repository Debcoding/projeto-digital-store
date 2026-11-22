import { memo } from 'react';
import { Link } from 'react-router-dom';
import { productsPath } from '../constants/routes.js';
import { publicUrl } from '../utils/assets.js';
import '../styles/OfferSection.css';

function OfferSection() {
  return (
    <section className="offer">
      <div className="container offer__inner">
        <div className="offer__image">
          <img src={publicUrl('produc-image-1.jpeg')} alt="Air Jordan edição de colecionador" loading="lazy" decoding="async" />
        </div>
        <div className="offer__content">
          <span className="offer__eyebrow">Oferta especial</span>
          <h2 className="offer__title">Air Jordan edição de colecionador</h2>
          <p className="offer__text">
            Uma presença marcante em cada detalhe. Descubra o encontro entre atitude, conforto e um estilo que
            atravessa gerações.
          </p>
          <Link to={productsPath({ q: 'Air Jordan' })} className="btn-primary">Ver Oferta</Link>
        </div>
      </div>
    </section>
  );
}

export default memo(OfferSection);
