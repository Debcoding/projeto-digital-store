import { useState } from 'react';

/**
 * Seletor de uma opção (tamanho ou cor).
 * `options`: string[] (variant "square") ou { name, hex }[] (variant "circle").
 */
export default function OptionPicker({ label, options, variant = 'square' }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="option">
      <h2 className="buybox__label">{label}</h2>
      <div className="option__list" role="group" aria-label={label}>
        {options.map((option) => {
          const value = typeof option === 'string' ? option : option.name;
          const on = selected === value;
          const common = { type: 'button', 'aria-pressed': on, onClick: () => setSelected(value) };

          return variant === 'circle' ? (
            <button key={value} {...common} className={`opt-circle${on ? ' is-selected' : ''}`} style={{ background: option.hex }} aria-label={option.name} />
          ) : (
            <button key={value} {...common} className={`opt-square${on ? ' is-selected' : ''}`}>{option}</button>
          );
        })}
      </div>
    </div>
  );
}
