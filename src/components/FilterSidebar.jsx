import { memo } from 'react';
import { FILTER_GROUPS } from '../constants/catalog.js';

/**
 * Barra lateral de filtros (componente controlado: o estado vive na URL).
 * `onToggle(key, value)` marca/desmarca; `onClear` limpa os grupos.
 */
function FilterSidebar({ filters, onToggle, onClear }) {
  return (
    <aside className="filters" aria-label="Filtros">
      <h2 className="filters__title">Filtrar por</h2>
      <hr />
      <form onSubmit={(event) => event.preventDefault()}>
        {FILTER_GROUPS.map(({ key, title, input, options }) => (
          <fieldset className="filter-group" key={key}>
            <legend>{title}</legend>
            {options.map((option) => {
              const checked = input === 'radio' ? filters[key] === option : filters[key].includes(option);
              return (
                <label className="filter-option" key={option}>
                  <input type={input} name={key} value={option} checked={checked} onChange={() => onToggle(key, option)} />
                  <span>{option}</span>
                </label>
              );
            })}
          </fieldset>
        ))}
      </form>
      <button type="button" className="filters__clear" onClick={onClear}>Limpar filtros</button>
    </aside>
  );
}

export default memo(FilterSidebar);
