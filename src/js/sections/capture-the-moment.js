import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver } from '../components/utils';

const $title = document.querySelector('.capture__title');
const $description = document.querySelector('.capture__description');
const $window = document.querySelector('.capture__window');
const $window2 = document.querySelector('.capture__window2');
const $shape = document.querySelector('.capture__shape');
const titleRevelation = new TextRevelation($title);

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

TweenMax.to($shape, 0, {
  scaleX: 0,
  skewX: -16
});

intersectionObserver(document.querySelector('.capture'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.3,
    ease: Power4.easeInOut
  });

  TweenMax.to($window, 1, {
    x: '150%',
    delay: 0.3,
    ease: Power4.easeInOut
  });

  TweenMax.to($window2, 1, {
    x: '150%',
    delay: 0.45,
    ease: Power4.easeInOut
  });

  TweenMax.to($shape, 0.7, {
    scaleX: 1,
    skewX: -16,
    delay: 0.45,
    ease: Power4.easeInOut
  });
});
