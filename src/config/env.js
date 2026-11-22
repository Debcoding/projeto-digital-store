// Configuração lida das variáveis de ambiente do Vite (.env / .env.local).
// Somente variáveis com prefixo VITE_ ficam disponíveis no navegador.

/** true = usa os dados locais (src/data); false = consome a API real. */
export const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false';

/** URL base da API do back-end. */
export const API_URL = import.meta.env.VITE_API_URL ?? 'http://localhost:3333';
