/** Ícones (SVG inline) das coleções, herdam a cor do texto (currentColor). */
const svgProps = {
  viewBox: '0 0 48 48',
  width: 40,
  height: 40,
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinejoin: 'round',
  strokeLinecap: 'round',
  'aria-hidden': true,
};

export const CATEGORY_ICONS = {
  camisetas: () => (
    <svg {...svgProps}><path d="M17 7l-11 6 4 9 5-2v21h18V20l5 2 4-9-11-6c-1 3-4 5-7 5s-6-2-7-5z" /></svg>
  ),
  calcas: () => (
    <svg {...svgProps}><path d="M14 5h20l3 38h-9l-4-23-4 23h-9z" /><path d="M14 11h20" /></svg>
  ),
  bones: () => (
    <svg {...svgProps}><path d="M8 30c0-12 7-19 16-19s16 7 16 19z" /><path d="M8 30c-3 1-4 3-3 5 6 2 22 2 35 0 1-2 0-4-3-5" /><circle cx="24" cy="11" r="1.5" /></svg>
  ),
  headphones: () => (
    <svg {...svgProps}><path d="M9 29v-5a15 15 0 0 1 30 0v5" /><rect x="6" y="27" width="9" height="14" rx="4" /><rect x="33" y="27" width="9" height="14" rx="4" /></svg>
  ),
  tenis: () => (
    <svg {...svgProps}><path d="M5 33V16l8 4c3 2 5 5 9 6l16 4c3 1 5 2 5 4H5z" /><path d="M5 37h38" /><path d="M20 24l2-3M25 26l2-3" /></svg>
  ),
};
