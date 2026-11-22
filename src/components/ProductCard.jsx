import { memo } from 'react';
import { Link } from 'react-router-dom';
import { categoryName } from '../constants/catalog.js';
import { productPath } from '../constants/routes.js';
import { formatPrice } from '../utils/format.js';
import '../styles/ProductCard.css';

/**
 * Card de produto. `variant` controla apenas a proporção da imagem:
 * 'home' | 'listing' | 'related'.
 * React.memo evita re-renderizar cards quando só os vizinhos mudam.
 */
function ProductCard({ product, variant = 'listing' }) {
  const { id, name, image, type, price, salePrice, discountPercent } = product;

  return (
    <article className={`product-card product-card--${variant}`}>
      <Link to={productPath(id)} className="product-card__link">
        <div className="product-card__image">
          {discountPercent > 0 && <span className="badge-tag">{discountPercent}% OFF</span>}
          <img src={image} alt={name} loading="lazy" decoding="async" />
        </div>
        <span className="product-card__category">{categoryName(type)}</span>
        <h3 className="product-card__name">{name}</h3>
        <p className="product-card__price">
          {salePrice != null ? (
            <>
              <s>{formatPrice(price)}</s> <b>{formatPrice(salePrice)}</b>
            </>
          ) : (
            <b>{formatPrice(price)}</b>
          )}
        </p>
      </Link>
    </article>
  );
}

export default memo(ProductCard);
