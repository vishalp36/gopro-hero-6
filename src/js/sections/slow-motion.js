import { TweenMax, Power4 } from 'gsap';
import TextRevelation from '../components/TextRevelation';
import { intersectionObserver, ease } from '../components/utils';
import VideoPlayer from '../components/VideoPlayer';

const $section = document.querySelector('.slow-motion');
const $title = document.querySelector('.slow-motion__title');
const $description = document.querySelector('.slow-motion__description');
const $separatorSquare = document.querySelector(
  '.slow-motion .separator__square'
);
const $separatorBar = document.querySelector('.slow-motion .separator__bar');
const $video = document.querySelector('.slow-motion__video');
const $button = document.querySelector('.slow-motion__button');
const $completion = document.querySelector('.slow-motion__circle2-completion');

const videoPlayer = new VideoPlayer(
  $section,
  document.querySelector('.slow-motion__button'),
  document.querySelector('.slow-motion__timer'),
  document.querySelector('.slow-motion__source')
);

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
  videoPlayer.init();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: -30,
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

  TweenMax.to($video, 0.8, {
    opacity: 1,
    y: -30,
    delay: 0.4,
    ease: Power4.easeOut
  });
});

$button.addEventListener('mouseenter', () => {
  TweenMax.to($completion, 1.4, {
    strokeDashoffset: 0,
    ease
  });
});

$button.addEventListener('mouseleave', () => {
  TweenMax.to($completion, 1.4, {
    strokeDashoffset: 180,
    ease
  });
});
