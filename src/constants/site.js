import { publicUrl } from '../utils/assets.js';

export const HERO_SLIDES = Array.from({ length: 8 }, (_, i) => publicUrl(`home-slide-${i + 1}.jpeg`));

export const SOCIAL_LINKS = [
  { name: 'Facebook', href: 'https://www.facebook.com/', icon: 'facebook' },
  { name: 'Instagram', href: 'https://www.instagram.com/', icon: 'instagram' },
  { name: 'Twitter / X', href: 'https://x.com/', icon: 'twitter' },
];

export const INFO_LINKS = ['Sobre Drip Store', 'Segurança', 'Wishlist', 'Blog', 'Trabalhe conosco', 'Meus Pedidos'];

export const CONTACT = {
  address: 'Av. Santos Dumont, 1510 - 1 andar - Aldeota, Fortaleza - CE, 60150-161',
  phone: '(85) 3051-3411',
};

export const TOAST_DURATION = 4000;
