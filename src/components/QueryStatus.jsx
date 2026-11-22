/** Mostra "carregando" / "erro com nova tentativa" ou, em sucesso, o conteúdo. */
export default function QueryStatus({ status, onRetry, children }) {
  if (status === 'loading') {
    return <p className="state-msg" role="status">Carregando...</p>;
  }
  if (status === 'error') {
    return (
      <div className="state-msg">
        <p>Não foi possível carregar as informações.</p>
        <button type="button" className="btn-primary" onClick={onRetry}>Tentar novamente</button>
      </div>
    );
  }
  return children;
}
