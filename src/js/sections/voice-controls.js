import { TweenMax, Power4 } from 'gsap';
import { intersectionObserver } from '../components/utils';
import { map, ease } from '../components/utils';

const $section = document.querySelector('.voice-controls');
const $illustrations = document.querySelectorAll(
  '.voice-controls__part-illustration'
);
const $explanations = document.querySelectorAll(
  '.voice-controls__part-explanation'
);

TweenMax.set($illustrations, {
  x: '-100%'
});

TweenMax.set($explanations, {
  x: '-100%'
});

intersectionObserver($section, () => {
  TweenMax.staggerTo(
    $illustrations,
    0.7,
    {
      x: '0%',
      ease
    },
    0.1
  );
});
