import { TweenMax, Power4, TimelineMax } from 'gsap';
import SectionRevelation from '../components/SectionRevelation';
import { intersectionObserver } from '../components/utils';

const $content = document.querySelector('.design-black__content');
const $visualSource = document.querySelector('.design-black__source');

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
      ease: Power4.easeOut,
      delay: 0.8
    }
  );

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
      ease: Power4.easeOut,
      delay: 0.7
    }
  );
});
