import { TweenMax, Power4 } from 'gsap';
import { intersectionObserver } from '../components/utils';
import TextRevelation from '../components/TextRevelation';
import VoiceControls from '../components/VoiceControls';
import { map, ease } from '../components/utils';
import lazyLoad from '../components/Lazyload';

const $section = document.querySelector('.voice-controls');
const $title = document.querySelector('.voice-controls__title');
const $description = document.querySelector('.voice-controls__description');
const $illustrations = document.querySelectorAll(
  '.voice-controls__part-illustration'
);
const $explanations = document.querySelectorAll(
  '.voice-controls__part-explanation'
);
const $button = document.querySelector('.voice-controls__button');
const $buttonContent = document.querySelector(
  '.voice-controls__button-content'
);
const $buttonContainer = document.querySelector(
  '.voice-controls__button-container'
);

const titleRevelation = new TextRevelation($title);
const voiceControls = new VoiceControls($section);

TweenMax.set($illustrations, {
  x: '-100%'
});

TweenMax.set($explanations, {
  x: '-100%'
});

TweenMax.set($description, {
  opacity: 0,
  y: 30
});

TweenMax.set($buttonContainer, {
  opacity: 0,
  y: 30
});

intersectionObserver($title, () => {
  titleRevelation.reveal();

  TweenMax.to($description, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.3,
    ease
  });

  TweenMax.to($buttonContainer, 0.8, {
    opacity: 1,
    y: 0,
    delay: 0.4,
    ease
  });

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

let buttonContainerDetails = $buttonContainer.getBoundingClientRect();
let buttonDetails = $buttonContainer.getBoundingClientRect();
let currentButtonPositionX = 0;
let currentButtonPositionY = 0;
let currentButtonContentPositionX = 0;
let currentButtonContentPositionY = 0;

$buttonContainer.addEventListener('mouseenter', event => {
  buttonContainerDetails = $buttonContainer.getBoundingClientRect();
  TweenMax.to($button, 1.2, {
    scale: 1.04,
    ease: Power4.easeOut
  });

  TweenMax.to($buttonContent, 1.2, {
    scale: 1.05,
    ease: Power4.easeOut
  });
});

$buttonContainer.addEventListener('mousemove', event => {
  let x = Math.floor(
    map(
      Math.abs(buttonContainerDetails.x - event.screenX),
      0,
      buttonDetails.width,
      -16,
      16
    )
  );

  let y =
    -16 +
    Math.floor(
      map(
        Math.abs(buttonContainerDetails.y - event.screenY),
        0,
        buttonDetails.width,
        -16,
        16
      )
    );

  TweenMax.to($button, 1.2, {
    x: currentButtonPositionX + x,
    y: currentButtonPositionY + y,
    ease: Power4.easeOut
  });

  TweenMax.to($buttonContent, 1.2, {
    x: currentButtonPositionX + x * 0.5,
    y: currentButtonPositionY + y * 0.5,
    ease: Power4.easeOut
  });
});

$buttonContainer.addEventListener('mouseleave', event => {
  TweenMax.to($button, 1.2, {
    x: -currentButtonPositionX,
    y: -currentButtonPositionY,
    scale: 0.96,
    ease: Power4.easeOut
  });

  TweenMax.to($buttonContent, 1.2, {
    x: -currentButtonPositionX,
    y: -currentButtonPositionY,
    scale: 0.95,
    ease: Power4.easeOut
  });
});
