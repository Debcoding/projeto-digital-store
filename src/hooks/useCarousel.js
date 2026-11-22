import { useCallback, useState } from 'react';

/** Estado de um carrossel simples (sem loop): índice atual e navegação. */
export function useCarousel(length, initialIndex = 0) {
  const last = Math.max(0, length - 1);
  const [index, setIndex] = useState(Math.min(Math.max(0, initialIndex), last));

  const prev = useCallback(() => setIndex((i) => Math.max(0, i - 1)), []);
  const next = useCallback(() => setIndex((i) => Math.min(last, i + 1)), [last]);
  const goTo = useCallback((i) => setIndex(Math.min(Math.max(0, i), last)), [last]);

  return { index, prev, next, goTo, canPrev: index > 0, canNext: index < last };
}
