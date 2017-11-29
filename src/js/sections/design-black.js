import { TweenMax } from 'gsap';
import SectionRevelation from '../components/SectionRevelation';
import lazyload from '../components/Lazyload';
import { intersectionObserver, ease } from '../components/utils';

const $content = document.querySelector('.design-black__content');
const $visualSource = document.querySelector('.design-black__source');
const $separatorSquare = document.querySelector(
  '.design-black .separator__square'
);
const $separatorBar = document.querySelector('.design-black .separator__bar');

const sectionRevelation = new SectionRevelation(
  document.querySelector('.design-black__windows'),
  [
    {
      color: '#101010'
    },
    {
      color: '#161616'
    },
    {
      color: '#1E1E1E'
    }
  ]
);

intersectionObserver(document.querySelector('.design-black'), () => {
  sectionRevelation.reveal();

  lazyload.triggerLoad(document.querySelector('.design-black__source'));

  TweenMax.fromTo(
    $content,
    0.7,
    {
      opacity: 0,
      x: -20
    },
    {
      opacity: 1,
      x: 0,
      ease,
      delay: 0.8
    }
  );

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

  TweenMax.fromTo(
    $visualSource,
    0.7,
    {
      opacity: 0,
      x: 20
    },
    {
      opacity: 1,
      x: 0,
      ease,
      delay: 0.7
    }
  );
});
