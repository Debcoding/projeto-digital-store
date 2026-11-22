import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { useDocumentTitle } from '../hooks/useDocumentTitle.js';
import '../styles/StatusPage.css';

/** Página simples de aviso: "Em breve", "Página não encontrada" etc. */
export default function StatusPage({ title, text }) {
  useDocumentTitle(`${title} – Digital Store`);

  return (
    <section className="soon">
      <div className="container">
        <h1 className="soon__title">{title}</h1>
        <p className="soon__text">{text}</p>
        <Link to={ROUTES.home} className="btn-primary">Voltar ao início</Link>
      </div>
    </section>
  );
}
