import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver, ease } from '../components/utils';
import EarthGlobe from '../components/EarthGlobe';
import EarthGlobeElements from '../components/EarthGlobeElements';
import markers from '../data/markers.json';

const globe = new EarthGlobe(
  document.querySelector('.join-community__globe'),
  window
);

const globeElements = new EarthGlobeElements(
  globe,
  document.querySelector('.join-community__elements')
);
markers.forEach(marker => {
  const el = globe.addMarker(marker);
  globeElements.addElement(el);
});

const $title = document.querySelector('.join-community__title');
const $description = document.querySelector('.join-community__description');
const $separatorSquare = document.querySelector(
  '.join-community .separator__square'
);
const $separatorBar = document.querySelector('.join-community .separator__bar');

const titleRevelation = new TextRevelation($title);

TweenMax.set($description, {
  opacity: 0,
  y: 30
});

intersectionObserver(document.querySelector('.join-community__title'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.3,
    ease
  });

  TweenMax.to($separatorSquare, 0.5, {
    strokeDasharray: 230,
    delay: 0.5,
    ease
  });

  TweenMax.to($separatorBar, 0.6, {
    scaleX: 1,
    delay: 0.8,
    ease
  });
});
