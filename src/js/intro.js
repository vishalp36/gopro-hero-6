import { TweenMax, Expo, TimelineMax, Power4 } from 'gsap';
import SnowParticles from './components/SnowParticles';
import ButtonMovement from './components/ButtonMovement';

const movement = new ButtonMovement(document.querySelector('.intro'), [
  {
    domElement: document.querySelector('.intro__snowboarder'),
    scale: 1.2,
    movement: 'normal'
  }
]);

const particles = new SnowParticles();

document.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const $loader = document.querySelector('.loader');
    const $background = document.querySelector('.intro__background');
    const $backgroundAfter = document.querySelector('.intro__background-cover');
    const $leftMountain = document.querySelector('.intro__mountain-left');
    const $rightMountain = document.querySelector('.intro__mountain-right');
    const $snowboarder = document.querySelector('.intro__snowboarder');
    const $gopro = document.querySelector('.intro__gopro');

    const loadingTimeline = new TimelineMax();

    loadingTimeline
      .to($loader, 1.2, {
        scaleX: 0,
        transformOrigin: 'right',
        ease: Expo.easeOut
      })
      .fromTo(
        $background,
        1.3,
        {
          opacity: 0
        },
        {
          opacity: 1,
          ease: Power4.easeOut
        },
        '-=1'
      )
      .to(
        $backgroundAfter,
        1.5,
        {
          scaleX: 0,
          transformOrigin: 'right',
          ease: Expo.easeOut
        },
        '-=1.2'
      )
      .fromTo(
        $leftMountain,
        0.5,
        {
          opacity: 0
        },
        {
          opacity: 1
        },
        '-=1.5'
      )
      .fromTo(
        $leftMountain,
        1.5,
        {
          x: -50
        },
        {
          x: -10,
          ease: Expo.easeOut
        },
        '-=1.5'
      )
      .fromTo(
        $rightMountain,
        0.5,
        {
          opacity: 0
        },
        {
          opacity: 1
        },
        '-=1.5'
      )
      .fromTo(
        $rightMountain,
        1.3,
        {
          x: 0,
          opacity: 0
        },
        {
          x: 30,
          opacity: 1,
          ease: Expo.easeOut
        },
        '-=1.5'
      )
      .fromTo(
        $snowboarder,
        1.5,
        {
          y: -40,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Power4.easeOut
        },
        '-=1.5'
      )
      .fromTo(
        $gopro,
        1.2,
        {
          y: 60,
          opacity: 0
        },
        {
          y: 0,
          opacity: 1,
          ease: Power4.easeOut
        },
        '-=1.3'
      );

    const $title = document.querySelector('.intro__title');
    const content = $title.innerHTML.split(' ');
    $title.innerHTML = content
      .map(
        el =>
          `
          <div class="wrapper__title">
            <span>${el}</span>
          </div>
        `
      )
      .join('');

    const $titleParts = [].slice.call(
      document.querySelectorAll('.wrapper__title')
    );

    $titleParts.reduce((prev, val, index) => {
      const y = val.getBoundingClientRect().top;
      if (index === 0) {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: 100
          },
          {
            y: 0,
            ease: Power4.easeOut
          }
        );
      } else if (prev && prev === y) {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: 100
          },
          {
            y: 0,
            ease: Power4.easeOut
          },
          '-=0.6'
        );
      } else {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: 100
          },
          {
            y: 0,
            ease: Power4.easeOut
          },
          '-=0.5'
        );
      }

      return y;
    }, false);

    loadingTimeline.fromTo(
      document.querySelector('.intro__button-container'),
      0.6,
      {
        scale: 0,
        opacity: 0
      },
      {
        scale: 1,
        opacity: 1,
        ease: Power4.easeOut
      },
      '-=0.4'
    );
  }, 1000);
});

const map = (value, istart, istop, ostart, ostop) => {
  return ostart + (ostop - ostart) * ((value - istart) / (istop - istart));
};

const $button = document.querySelector('.intro__button');
const $buttonContainer = document.querySelector('.intro__button-container');
let buttonContainerDetails = $buttonContainer.getBoundingClientRect();
let buttonDetails = $buttonContainer.getBoundingClientRect();
let currentPositionX = 0;
let currentPositionY = 0;

$buttonContainer.addEventListener('mouseenter', event => {
  buttonContainerDetails = $buttonContainer.getBoundingClientRect();
  TweenMax.to($button, 1.2, {
    scale: 1.1,
    ease: Power4.easeOut
  });
});

$buttonContainer.addEventListener('mousemove', event => {
  let x = Math.floor(
    map(
      Math.abs(buttonContainerDetails.x - event.screenX),
      0,
      buttonDetails.width,
      -20,
      20
    )
  );

  let y =
    -20 +
    Math.floor(
      map(
        Math.abs(buttonContainerDetails.y - event.screenY),
        0,
        buttonDetails.width,
        -20,
        20
      )
    );

  TweenMax.to($button, 1.2, {
    x: currentPositionX + x,
    y: currentPositionY + y,
    ease: Power4.easeOut
  });
});

$buttonContainer.addEventListener('mouseleave', event => {
  TweenMax.to($button, 1.2, {
    x: -currentPositionX,
    x: -currentPositionY,
    scale: 0.9,
    ease: Power4.easeOut
  });
});
