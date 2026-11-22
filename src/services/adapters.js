/**
 * Adaptadores entre o contrato da API e o formato usado pelo front-end.
 * Se o back-end mudar nomes de campos, só este arquivo precisa ser ajustado.
 *
 * Formato interno de produto (o que os componentes esperam):
 * {
 *   id, name, image, images[], price, salePrice | null, discountPercent,
 *   type ('tenis'...), brand, category, gender, condition
 * }
 */

const pick = (value) => (value && typeof value === 'object' ? value.name ?? value.slug : value);

export function toProduct(raw) {
  const price = Number(raw.price);
  const salePrice = raw.salePrice ?? raw.promotionalPrice ?? null;
  const image = raw.image ?? raw.imageUrl ?? raw.images?.[0] ?? '';

  return {
    id: raw.id,
    name: raw.name,
    image,
    images: raw.images?.length ? raw.images : [image].filter(Boolean),
    price,
    salePrice: salePrice != null ? Number(salePrice) : null,
    discountPercent:
      raw.discountPercent ?? (salePrice != null && price ? Math.round((1 - Number(salePrice) / price) * 100) : 0),
    type: raw.type ?? raw.categorySlug ?? 'tenis',
    brand: pick(raw.brand) ?? '',
    category: pick(raw.category) ?? '',
    gender: raw.gender ?? '',
    condition: raw.condition ?? '',
  };
}

/** Aceita `[...]`, `{ data: [...] }` ou `{ items: [...] }` (com `total` opcional). */
export function toProductList(response) {
  const items = Array.isArray(response) ? response : response?.data ?? response?.items ?? [];
  const total = response?.total ?? response?.meta?.total ?? items.length;
  return { items: items.map(toProduct), total };
}

/** Filtros internos -> query string esperada pela API (GET /products). */
export function toProductsQuery(filters = {}) {
  return {
    type: filters.type,
    search: filters.search,
    brand: filters.brands,
    category: filters.categories,
    gender: filters.genders,
    condition: filters.condition,
    sort: filters.sort && filters.sort !== 'relevance' ? filters.sort : undefined,
  };
}
