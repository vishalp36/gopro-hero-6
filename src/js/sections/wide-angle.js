import { TweenMax, Power4 } from 'gsap';
import { map, ease } from '../components/utils';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver } from '../components/utils';

const $section = document.querySelector('.wide-angle');
const $description = document.querySelector('.wide-angle__description');
const $separatorSquare = document.querySelector(
  '.wide-angle .separator__square'
);
const $separatorBar = document.querySelector('.wide-angle .separator__bar');
const $shape = document.querySelector('.wide-angle__shape');
const $shape2 = document.querySelector('.wide-angle__shape2');
const $title = document.querySelector('.wide-angle__title');
const $source = document.querySelector('.wide-angle__illustration');
const $sourceSource = document.querySelector('.wide-angle__source');
const $borderLeft = document.querySelector('.wide-angle__border-left');
const $borderRight = document.querySelector('.wide-angle__border-right');
let windowHeight = window.innerHeight;

const titleRevelation = new TextRevelation($title);

TweenMax.to($shape, 0, {
  scaleX: 0,
  skewX: -30
});

TweenMax.to($shape2, 0, {
  scaleX: 0,
  x: '-120%',
  skewX: -30
});

TweenMax.to($description, 0, {
  opacity: 0,
  y: 30
});

document.addEventListener('resize', () => {
  windowHeight = window.innerHeight;
});

document.addEventListener('scroll', () => {
  const gbcr = $source.getBoundingClientRect();
  let value = Math.floor(-windowHeight + gbcr.top + gbcr.height * (2 / 3));

  if (value > gbcr.height * (2 / 3)) {
    value = Math.floor(gbcr.height * (2 / 3));
  }

  if (value < 0) {
    value = 0;
  }

  const mappedValue = map(value, 0, Math.floor(gbcr.height * (2 / 3)), 0, 1);
  TweenMax.to($borderLeft, 1.8, {
    css: {
      scaleX: mappedValue
    },
    ease: Power4.easeOut
  });

  TweenMax.to($borderRight, 1.8, {
    css: {
      scaleX: mappedValue
    },
    ease: Power4.easeOut
  });

  TweenMax.to($sourceSource, 1.8, {
    css: {
      scale: 1.05 + mappedValue * 0.2
    },
    ease: Power4.easeOut
  });
});

intersectionObserver(document.querySelector('.wide-angle__content'), () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.3,
    ease
  });

  TweenMax.to($shape, 0.7, {
    scaleX: 1,
    skewX: -30,
    delay: 0.45,
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

  TweenMax.to($shape2, 0.7, {
    scaleX: 1,
    skewX: -30,
    x: '0%',
    delay: 0.45,
    ease
  });
});

let sourceWidth = Math.round($sourceSource.offsetWidth);
let sourceHeight = Math.round($sourceSource.offsetHeight);
let containerWidthCenter = Math.round($source.offsetWidth / 2);
let containerHeightCenter = Math.round($source.offsetHeight / 2);

document.addEventListener('resize', () => {
  containerWidthCenter = Math.round($source.offsetWidth / 2);
  containerHeightCenter = Math.round($source.offsetHeight / 2);

  sourceWidth = Math.round($sourceSource.offsetWidth);
  sourceHeight = Math.round($sourceSource.offsetHeight);
});

$source.addEventListener('mousemove', event => {
  const x = -containerWidthCenter + event.clientX;
  const y = containerHeightCenter - event.clientY;

  const mappedX = Math.round(map(x, 0, containerWidthCenter, 0, 10));
  const mappedY = Math.round(map(y, 0, containerHeightCenter, 0, 10));

  TweenMax.to($sourceSource, 1.8, {
    x: -mappedX,
    y: mappedY,
    z: 30,
    rotationY: Math.round(mappedY * 0.05),
    rotationX: Math.round(mappedX * 0.05),
    ease: Power4.easeOut
  });
});
