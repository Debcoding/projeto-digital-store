import { memo } from 'react';
import '../styles/Toast.css';

/** Pop-up "ainda não está disponível". Controlado pelo ToastProvider. */
function Toast({ message, visible, onClose }) {
  return (
    <div className={`toast${visible ? ' is-visible' : ''}`} role="status" aria-live="polite" aria-hidden={!visible}>
      <span>{message}</span>
      <button type="button" className="toast__close" onClick={onClose} aria-label="Fechar aviso" tabIndex={visible ? 0 : -1}>
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </button>
    </div>
  );
}

export default memo(Toast);
