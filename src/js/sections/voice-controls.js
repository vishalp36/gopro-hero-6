import { TweenMax } from 'gsap';
import { intersectionObserver } from '../components/utils';
import { ease } from '../components/utils';
import lazyLoad from '../components/Lazyload';

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
  const coolImages = [].slice.call(
    document.querySelectorAll('.voice-controls img.lazyload')
  );

  coolImages.forEach(coolImage => {
    lazyLoad.triggerLoad(coolImage);
  });

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
