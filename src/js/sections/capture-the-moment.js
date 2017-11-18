import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver } from '../components/utils';

const $title = document.querySelector('.capture__title');
const $description = document.querySelector('.capture__description');
const $window = document.querySelector('.capture__window');
const $window2 = document.querySelector('.capture__window2');
const $shape = document.querySelector('.capture__shape');
const $separatorSquare = document.querySelector('.capture .separator__square');
const $separatorBar = document.querySelector('.capture .separator__bar');
const titleRevelation = new TextRevelation($title);

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

TweenMax.to($shape, 0, {
  scaleX: 0,
  skewX: -30
});

intersectionObserver(document.querySelector('.capture'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.3,
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
    skewX: -30,
    delay: 0.45,
    ease: Power4.easeInOut
  });
});
