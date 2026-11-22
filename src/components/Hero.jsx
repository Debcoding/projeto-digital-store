import { memo } from 'react';
import { Link } from 'react-router-dom';
import arrowLeft from '../assets/arrow-left.svg';
import arrowRight from '../assets/arrow-right.svg';
import { ROUTES } from '../constants/routes.js';
import { HERO_SLIDES } from '../constants/site.js';
import { useCarousel } from '../hooks/useCarousel.js';
import '../styles/Hero.css';

function HeroSlider({ slides }) {
  const { index, prev, next, canPrev, canNext } = useCarousel(slides.length);

  return (
    <div className="slider" aria-roledescription="carrossel">
      <div className="slider__viewport">
        <div className="slider__track" style={{ transform: `translateX(-${index * 100}%)` }}>
          {slides.map((src, i) => (
            <div className="slider__slide" key={src} role="group" aria-label={`Slide ${i + 1} de ${slides.length}`}>
              <img
                src={src}
                alt={`Destaque ${i + 1}`}
                loading={i === 0 ? 'eager' : 'lazy'}
                fetchpriority={i === 0 ? 'high' : 'auto'}
                decoding="async"
              />
            </div>
          ))}
        </div>
      </div>
      <div className="slider__nav">
        <button type="button" className="slider__btn" onClick={prev} disabled={!canPrev} aria-label="Slide anterior">
          <img src={arrowLeft} alt="" width="24" height="24" />
        </button>
        <button type="button" className="slider__btn" onClick={next} disabled={!canNext} aria-label="Próximo slide">
          <img src={arrowRight} alt="" width="24" height="24" />
        </button>
      </div>
    </div>
  );
}

function Hero() {
  return (
    <section className="hero" aria-label="Destaques">
      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__eyebrow">Melhores ofertas personalizadas</span>
          <h1 className="hero__title">Seu estilo, seu próximo passo 🔥</h1>
          <p className="hero__text">
            Encontre o seu próximo favorito. Estilo e conforto para acompanhar você em todos os momentos.
          </p>
          <Link to={ROUTES.products} className="btn-primary">Ver Ofertas</Link>
        </div>
        <HeroSlider slides={HERO_SLIDES} />
      </div>
    </section>
  );
}

export default memo(Hero);
