import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import { useCarousel } from '../hooks/useCarousel.js';

/**
 * Galeria: imagem principal com setas + miniaturas selecionáveis.
 * Começa na imagem do card clicado (`initialImage`). Use `key={product.id}`
 * no pai para reiniciar ao trocar de produto.
 */
export default function ProductGallery({ images, initialImage, alt }) {
  const start = Math.max(0, images.indexOf(initialImage));
  const { index, prev, next, goTo, canPrev, canNext } = useCarousel(images.length, start);

  return (
    <div className="gallery">
      <div className="gallery__viewport">
        <div className="gallery__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {images.map((src, i) => (
            <div className="gallery__slide" key={src + i}>
              <img src={src} alt={`${alt} – imagem ${i + 1}`} decoding="async" loading={i === start ? 'eager' : 'lazy'} />
            </div>
          ))}
        </div>
        <button type="button" className="gallery__arrow gallery__arrow--prev" onClick={prev} disabled={!canPrev} aria-label="Imagem anterior">
          <img src={arrowLeft} alt="" width="16" height="16" />
        </button>
        <button type="button" className="gallery__arrow gallery__arrow--next" onClick={next} disabled={!canNext} aria-label="Próxima imagem">
          <img src={arrowRight} alt="" width="16" height="16" />
        </button>
      </div>

      <div className="gallery__thumbs">
        {images.map((src, i) => (
          <button
            key={src + i}
            type="button"
            className={`gallery__thumb${i === index ? ' is-selected' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Ver imagem ${i + 1}`}
            aria-current={i === index}
          >
            <img src={src} alt="" loading="lazy" decoding="async" />
          </button>
        ))}
      </div>
    </div>
  );
}
