import { TweenMax } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver, ease } from '../components/utils';

const $title = document.querySelector('.share-story__title');
const $description = document.querySelector('.share-story__description');
const $separatorSquare = document.querySelector(
  '.share-story .separator__square'
);
const $separatorBar = document.querySelector('.share-story .separator__bar');
const titleRevelation = new TextRevelation($title);

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

intersectionObserver(document.querySelector('.share-story'), () => {
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
