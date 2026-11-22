import { memo } from 'react';
import { Link } from 'react-router-dom';
import { ROUTES } from '../constants/routes.js';
import { publicUrl } from '../utils/assets.js';
import SectionHeader from './SectionHeader.jsx';
import '../styles/CollectionBanners.css';

const BANNERS = [
  { file: 'collection-1.png', alt: 'Novo drop Supreme – 30% OFF' },
  { file: 'collection-2.png', alt: 'Coleção Adidas – 30% OFF' },
  { file: 'collection-3.png', alt: 'Novo Beats Bass – 30% OFF' },
];

function CollectionBanners() {
  return (
    <section className="section container">
      <SectionHeader title="Coleções em destaque" />
      <div className="banners">
        {BANNERS.map(({ file, alt }) => (
          <Link key={file} to={ROUTES.products}>
            <img src={publicUrl(file)} alt={alt} loading="lazy" decoding="async" />
          </Link>
        ))}
      </div>
    </section>
  );
}

export default memo(CollectionBanners);
