import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver, ease } from '../components/utils';

const $title = document.querySelector('.share-story__title');
const $description = document.querySelector('.share-story__description');
const $gopro = document.querySelector('.share-story__source');
const $separatorSquare = document.querySelector(
  '.share-story .separator__square'
);
const $separatorBar = document.querySelector('.share-story .separator__bar');
const $clouds = [].slice.call(
  document.querySelectorAll('.share-story__cloud img')
);
const titleRevelation = new TextRevelation($title);

TweenMax.set($description, {
  opacity: 0,
  y: 30
});

TweenMax.set($gopro, {
  opacity: 0,
  y: 30
});

TweenMax.set($clouds, {
  opacity: 0,
  scale: 0
});

intersectionObserver(document.querySelector('.share-story'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.3,
    ease
  });

  TweenMax.to($gopro, 0.5, {
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

  TweenMax.staggerTo(
    $clouds,
    0.8,
    {
      opacity: 1,
      scale: 1,
      ease
    },
    0.06
  );
});

const movingClouds = event => {
  $clouds.forEach(cloud => {
    const gbcr = cloud.getBoundingClientRect();
    TweenMax.to(cloud, 0.1, {
      y: gbcr.top * 0.12 * parseFloat(cloud.getAttribute('data-move')),
      ease: Power4.easeOut
    });
  });
};

const observer = new IntersectionObserver(
  observables => {
    observables.forEach(observable => {
      if (observable.intersectionRatio >= 0.1) {
        window.addEventListener('scroll', movingClouds, false);
      } else {
        window.removeEventListener('scroll', movingClouds, false);
      }
    });
  },
  {
    threshold: [0.1]
  }
);

observer.observe(document.querySelector('.share-story'));
