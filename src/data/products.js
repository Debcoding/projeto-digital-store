import { publicUrl } from '../utils/assets.js';

/**
 * Dados de demonstração (usados só quando VITE_USE_MOCK=true).
 *
 * Regras aplicadas aqui, e que no back-end já virão calculadas:
 *  1. todos os preços = preço do PDF + 5%;
 *  2. os 3 primeiros produtos recebem 35% de desconto;
 *  3. todo valor é arredondado para cima até a próxima dezena (150,00; 200,00...).
 */
const round2 = (n) => Math.round(n * 100) / 100;
const ceil10 = (n) => Math.ceil(round2(n) / 10) * 10;

/** Imagens da galeria (iguais para todos os produtos). */
export const GALLERY_IMAGES = Array.from({ length: 5 }, (_, i) => publicUrl(`product-thumb-${i + 1}.jpeg`));

const RAW = [
  { name: 'Tênis Air Jordan — Masculino',      thumb: 1, base: 200, brand: 'Nike',       category: 'Casual',          gender: 'Masculino', condition: 'Novo'  },
  { name: 'Tênis Nike Casual — Unissex',       thumb: 2, base: 220, brand: 'Nike',       category: 'Casual',          gender: 'Unissex',   condition: 'Novo'  },
  { name: 'Tênis Sport Classic — Feminino',    thumb: 3, base: 240, brand: 'Puma',       category: 'Esporte e lazer', gender: 'Feminino',  condition: 'Novo'  },
  { name: 'Tênis Urban — Masculino',           thumb: 4, base: 260, brand: 'Adidas',     category: 'Casual',          gender: 'Masculino', condition: 'Usado' },
  { name: 'Tênis Everyday — Unissex',          thumb: 5, base: 280, brand: 'Nike',       category: 'Corrida',         gender: 'Unissex',   condition: 'Novo'  },
  { name: 'Tênis Air Jordan — Feminino',       thumb: 1, base: 300, brand: 'Nike',       category: 'Casual',          gender: 'Feminino',  condition: 'Novo'  },
  { name: 'Tênis Nike Essential — Masculino',  thumb: 2, base: 320, brand: 'Nike',       category: 'Esporte e lazer', gender: 'Masculino', condition: 'Usado' },
  { name: 'Tênis Sport Comfort — Unissex',     thumb: 3, base: 340, brand: 'K-Swiss',    category: 'Utilitário',      gender: 'Unissex',   condition: 'Novo'  },
  { name: 'Tênis Urban Classic — Feminino',    thumb: 4, base: 360, brand: 'Balenciaga', category: 'Casual',          gender: 'Feminino',  condition: 'Novo'  },
  { name: 'Tênis Everyday Casual — Masculino', thumb: 5, base: 380, brand: 'Nike',       category: 'Corrida',         gender: 'Masculino', condition: 'Novo'  },
  { name: 'Tênis Air Jordan High — Unissex',   thumb: 1, base: 400, brand: 'Nike',       category: 'Esporte e lazer', gender: 'Unissex',   condition: 'Usado' },
  { name: 'Tênis Nike Street — Feminino',      thumb: 2, base: 420, brand: 'Nike',       category: 'Utilitário',      gender: 'Feminino',  condition: 'Novo'  },
];

export const PRODUCTS = RAW.map(({ thumb, base, ...rest }, index) => {
  const price = ceil10(base * 1.05);
  const hasDiscount = index < 3;
  return {
    id: index + 1,
    ...rest,
    type: 'tenis',
    image: GALLERY_IMAGES[thumb - 1],
    images: GALLERY_IMAGES,
    price,
    salePrice: hasDiscount ? ceil10(price * 0.65) : null,
    discountPercent: hasDiscount ? 35 : 0,
  };
});
