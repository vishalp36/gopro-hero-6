import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver } from '../components/utils';
import Touchzoom from '../components/Touchzoom';

const $section = document.querySelector('.touch-zoom');
const $view = document.querySelector('.touch-zoom__view');
const $title = document.querySelector('.touch-zoom__title');
const $description = document.querySelector('.touch-zoom__description');
const $separatorSquare = document.querySelector(
  '.touch-zoom .separator__square'
);
const $separatorBar = document.querySelector('.touch-zoom .separator__bar');
const touchzoom = new Touchzoom(
  document.querySelector('.touch-zoom__view'),
  document.querySelector('.touch-zoom__source'),
  document.querySelector('.touch-zoom__pointer'),
  document.querySelector('.touch-zoom__controls')
);

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

TweenMax.to($view, 0, {
  opacity: 0,
  y: 30
});

const titleRevelation = new TextRevelation($title);

intersectionObserver(document.querySelector('.touch-zoom__content'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.7,
    ease: Power4.easeInOut
  });

  TweenMax.to($separatorSquare, 0.5, {
    strokeDasharray: 230,
    delay: 0.5,
    ease: Power4.easeOut
  });

  TweenMax.to($separatorBar, 0.6, {
    scaleX: 1,
    delay: 0.8,
    ease: Power4.easeOut
  });

  TweenMax.to($view, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.6,
    ease: Power4.easeInOut
  });
});
