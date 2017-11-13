import { TweenMax, Power4 } from 'gsap';
import TextRevelation from './components/TextRevelation';
import { intersectionObserver } from './components/utils';

const $title = document.querySelector('.slow-motion__title');
const $description = document.querySelector('.slow-motion__description');
const $video = document.querySelector('.slow-motion__video');
const $button = document.querySelector('.slow-motion__button');
const $completion = document.querySelector('.slow-motion__circle2-completion');

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

TweenMax.to($video, 0, {
  opacity: 0,
  y: 30
});

const titleRevelation = new TextRevelation($title);

intersectionObserver(document.querySelector('.slow-motion'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.3,
    ease: Power4.easeInOut
  });

  TweenMax.to($video, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.4,
    ease: Power4.easeInOut
  });
});

$button.addEventListener('mouseenter', () => {
  TweenMax.to($completion, 1.4, {
    strokeDashoffset: 0,
    ease: Power4.easeOut
  });
});

$button.addEventListener('mouseleave', () => {
  TweenMax.to($completion, 1.4, {
    strokeDashoffset: 180,
    ease: Power4.easeOut
  });
});
