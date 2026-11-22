import { memo } from 'react';
import ProductCard from './ProductCard.jsx';

/** Grade de cards. `columns`: 3 ou 4 (colunas no desktop). */
function ProductList({ products, variant, columns = 4 }) {
  return (
    <ul className={`product-list product-list--${columns}`}>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} variant={variant} />
        </li>
      ))}
    </ul>
  );
}

export default memo(ProductList);
