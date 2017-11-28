import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver, ease } from '../components/utils';

const $title = document.querySelector('.footer__title');
const $button = document.querySelector('.footer__cta');
const $bars = document.querySelectorAll('.footer__bar');
const $squares = document.querySelectorAll('.footer__square');

const titleRevelation = new TextRevelation($title);

TweenMax.set($button, {
  opacity: 0,
  y: '10%'
});

TweenMax.set($bars, {
  scaleX: 0
});

TweenMax.set($squares, {
  strokeDasharray: 0
});

intersectionObserver(document.querySelector('.footer__content'), () => {
  titleRevelation.reveal();

  TweenMax.to($button, 0.5, {
    opacity: 1,
    y: '0%',
    delay: 0.5,
    ease
  });

  TweenMax.to($squares, 0.5, {
    strokeDasharray: 230,
    delay: 0.5,
    ease
  });

  TweenMax.to($bars, 0.6, {
    scaleX: 1,
    delay: 0.8,
    ease
  });
});
