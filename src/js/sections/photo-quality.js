import { TweenMax, Power4 } from 'gsap';
import Bubbles from '../components/Bubbles';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver } from '../components/utils';
import lazyLoad from '../components/Lazyload';

const bubbles = new Bubbles(document.querySelector('.bubbles--first'));
const bubbles2 = new Bubbles(document.querySelector('.bubbles--second'), -1.5);

const $title = document.querySelector('.photo-quality__title');
const $description = document.querySelector('.photo-quality__description');
const $shape = document.querySelector('.photo-quality__shape');
const $bubbles = document.querySelectorAll('.bubbles--first .bubbles__element');
const $bubbles2 = document.querySelectorAll(
  '.bubbles--second .bubbles__element'
);

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

TweenMax.to($shape, 0, {
  x: '-200%',
  skewX: -30
});

TweenMax.to(document.querySelectorAll('.bubbles__element'), 0, {
  opacity: 0,
  x: -30
});

const titleRevelation = new TextRevelation($title);

intersectionObserver(document.querySelector('.photo-quality'), () => {
  titleRevelation.reveal();

  const coolImages = [].slice.call(
    document.querySelectorAll('.bubbles__element img.lazyload')
  );
  coolImages.forEach(coolImage => {
    lazyLoad.triggerLoad(coolImage);
  });

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.3,
    ease: Power4.easeInOut
  });

  TweenMax.staggerTo(
    $bubbles,
    0.8,
    {
      opacity: 1,
      x: 30,
      ease: Power4.easeOut,
      delay: 0.8
    },
    0.08
  );

  TweenMax.staggerTo(
    $bubbles2,
    0.8,
    {
      opacity: 1,
      x: 30,
      ease: Power4.easeOut,
      delay: 0.8
    },
    0.08
  );

  TweenMax.to($shape, 0.8, {
    x: '0%',
    skewX: -30,
    ease: Power4.easeOut,
    delay: 0.7
  });
});
