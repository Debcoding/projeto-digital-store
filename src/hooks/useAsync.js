import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * Executa uma função assíncrona (ex.: chamada a um serviço) e expõe o estado.
 *
 *   const { data, status, error, reload } = useAsync((signal) => service.get(id, { signal }), [id]);
 *
 * - `status`: 'loading' | 'success' | 'error'
 * - cancela a requisição anterior (AbortController) quando as dependências mudam
 *   ou o componente desmonta, evitando "corridas" entre respostas.
 * - `keepPreviousData`: mantém o resultado anterior enquanto carrega o próximo
 *   (útil em listas filtradas, evita "piscar" a tela).
 */
export function useAsync(asyncFn, deps = [], { keepPreviousData = false } = {}) {
  const [state, setState] = useState({ status: 'loading', data: null, error: null });
  const [attempt, setAttempt] = useState(0);
  const fnRef = useRef(asyncFn);
  fnRef.current = asyncFn;

  useEffect(() => {
    const controller = new AbortController();
    setState((prev) => ({ status: 'loading', data: keepPreviousData ? prev.data : null, error: null }));

    fnRef
      .current(controller.signal)
      .then((data) => {
        if (!controller.signal.aborted) setState({ status: 'success', data, error: null });
      })
      .catch((error) => {
        if (!controller.signal.aborted) setState({ status: 'error', data: null, error });
      });

    return () => controller.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  const reload = useCallback(() => setAttempt((n) => n + 1), []);

  return { ...state, reload };
}
