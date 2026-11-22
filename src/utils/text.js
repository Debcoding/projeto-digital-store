/** Remove acentos e coloca em minúsculas, para buscas tolerantes. */
export const normalizeText = (text = '') =>
  text.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
