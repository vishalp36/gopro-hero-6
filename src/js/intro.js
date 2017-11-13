import { TweenMax, Expo, TimelineMax, Power4 } from 'gsap';
import YoutubePlayer from 'youtube-player';
import { map, isMobile } from './components/utils';
import SnowParticles from './components/SnowParticles';
import ButtonMovement from './components/ButtonMovement';
import ProgressLoader from './components/ProgressLoader';
const progress = new ProgressLoader();

progress.on('progress', value => {
  document.querySelector('.loader').innerHTML = `${value}%`;
});

progress.on('complete', () => {
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
        x: '100%',
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
          x: '100%',
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
          y: '-10%',
          opacity: 0
        },
        {
          y: '0%',
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
          <div class="intro__title-wrapper">
            <span>${el}</span>
          </div>
        `
      )
      .join('');

    const $titleParts = [].slice.call(
      document.querySelectorAll('.intro__title-wrapper')
    );

    $titleParts.reduce((prev, val, index) => {
      const y = val.getBoundingClientRect().top;
      if (index === 0) {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: '110%'
          },
          {
            y: '0%',
            ease: Power4.easeOut
          }
        );
      } else if (prev && prev === y) {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: '110%'
          },
          {
            y: '0%',
            ease: Power4.easeOut
          },
          '-=0.6'
        );
      } else {
        loadingTimeline.fromTo(
          val.querySelector('span'),
          0.6,
          {
            y: '110%'
          },
          {
            y: '0%',
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

const movement = new ButtonMovement(document.querySelector('.intro'), [
  {
    domElement: document.querySelector('.intro__snowboarder'),
    scale: 1.2,
    movement: 'normal'
  }
]);

const $button = document.querySelector('.intro__button');
const $buttonContent = document.querySelector('.intro__button-content');
const $buttonContainer = document.querySelector('.intro__button-container');
const $videoIntro = document.querySelector('.video-intro');
const $videoIntroButton = document.querySelector('.video-intro__quit');
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

const player = YoutubePlayer('video-intro__source');
player.loadVideoById('vr0qNXmkUJ8');
player.pauseVideo();

$button.addEventListener('click', () => {
  $videoIntro.classList.add('video-intro--active');
  player.playVideo();
});

const quitIntroVideo = event => {
  event.preventDefault();
  $videoIntro.classList.remove('video-intro--active');
  player.pauseVideo();
};

$videoIntro.addEventListener('click', event => quitIntroVideo(event));
$videoIntroButton.addEventListener('click', event => quitIntroVideo(event));
