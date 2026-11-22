/**
 * Monta a URL de um arquivo da pasta /public respeitando o `base` do Vite
 * (necessário quando o site é publicado em um subcaminho).
 */
export const publicUrl = (fileName) => `${import.meta.env.BASE_URL}${fileName}`;
