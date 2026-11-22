/** Caminhos do site e construtores de URL (evita strings espalhadas). */
export const SECTION_COLLECTIONS = 'colecoes';

export const ROUTES = {
  home: '/',
  categories: `/#${SECTION_COLLECTIONS}`,
  products: '/produtos',
  comingSoon: '/em-breve',
};

export const productPath = (id) => `/produtos/${id}`;

/**
 * productsPath({ tipo: 'tenis', marca: 'Nike' }) -> "/produtos?tipo=tenis&marca=Nike"
 * Valores vazios são ignorados; arrays geram parâmetros repetidos.
 */
export function productsPath(query = {}) {
  const params = new URLSearchParams();
  Object.entries(query).forEach(([key, value]) => {
    [].concat(value ?? []).forEach((item) => {
      if (item !== '' && item != null) params.append(key, item);
    });
  });
  const qs = params.toString();
  return qs ? `${ROUTES.products}?${qs}` : ROUTES.products;
}
