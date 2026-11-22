import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Volta ao topo ao trocar de página. Não dispara quando só a query string
 * muda (marcar um filtro não deve "pular" a tela) nem quando há #âncora
 * (a própria página rola até a seção).
 */
export default function ScrollManager() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname, hash]);

  return null;
}
