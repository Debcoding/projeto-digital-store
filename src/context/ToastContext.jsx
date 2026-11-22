import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import Toast from '../components/Toast.jsx';
import { TOAST_DURATION } from '../constants/site.js';

const ToastContext = createContext(null);

/**
 * Pop-up global. O valor do contexto é estável (useMemo), então quem só
 * chama `notify` não re-renderiza quando a mensagem muda.
 */
export function ToastProvider({ children }) {
  const [message, setMessage] = useState('');
  const [visible, setVisible] = useState(false);
  const timer = useRef(null);

  const hide = useCallback(() => setVisible(false), []);

  const notify = useCallback((text) => {
    setMessage(text);
    setVisible(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setVisible(false), TOAST_DURATION);
  }, []);

  useEffect(() => () => clearTimeout(timer.current), []);

  const value = useMemo(
    () => ({
      notify,
      notifyUnavailable: (label) => notify(`${label} ainda não está disponível.`),
    }),
    [notify],
  );

  return (
    <ToastContext.Provider value={value}>
      {children}
      <Toast message={message} visible={visible} onClose={hide} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast deve ser usado dentro de <ToastProvider>.');
  return context;
}
