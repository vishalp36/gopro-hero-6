import { TweenMax, Expo, TimelineMax, Power4 } from 'gsap';
import bodymovin from 'bodymovin';
import YoutubePlayer from 'youtube-player';
import { map, isEdge, ease } from '../components/utils';
import ButtonMovement from '../components/ButtonMovement';
import ProgressLoader from '../components/ProgressLoader';

const progress = new ProgressLoader();
const $progressBar = document.querySelector('.loader__progress');
let animationFinished = false;
let loadingFinished = false;

const intro = bodymovin.loadAnimation({
  container: document.querySelector('.loader__logo'),
  renderer: 'svg',
  loop: false,
  autoplay: false,
  path: 'assets/data/intro.json'
});

setTimeout(() => {
  intro.play();
}, 1000);

window.addEventListener('beforeunload', () => {
  window.scrollTo(0, 0);

  TweenMax.set(document.querySelector('.loader'), {
    x: '0%'
  });
});

const introAnimation = () => {
  const $loader = document.querySelector('.loader');
  const $background = document.querySelector('.intro__background');
  const $backgroundAfter = document.querySelector('.intro__background-cover');
  const $leftMountain = document.querySelector('.intro__mountain-left');
  const $rightMountain = document.querySelector('.intro__mountain-right');
  const $snowboarder = document.querySelector('.intro__snowboarder');
  const $gopro = document.querySelector('.intro__gopro');
  const $logo = document.querySelector('.intro__logo');

  const loadingTimeline = new TimelineMax();

  loadingTimeline
    .set($progressBar, {
      transformOrigin: 'right'
    })
    .set($logo, {
      opacity: 0
    })
    .to($progressBar, 0.8, {
      scaleX: 0,
      ease
    })
    .to(
      $loader,
      1.2,
      {
        x: '100%',
        transformOrigin: 'right',
        ease
      },
      '-=0.8'
    )
    .fromTo(
      $background,
      1.3,
      {
        opacity: 0
      },
      {
        opacity: 1,
        ease
      },
      '-=1'
    )
    .to(
      $backgroundAfter,
      1.5,
      {
        x: '100%',
        transformOrigin: 'right',
        ease
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
        ease
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
        ease
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
        ease
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
        ease
      },
      '-=1.3'
    )
    .to(
      $logo,
      1.2,
      {
        opacity: 1,
        ease
      },
      '-=1'
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
          ease
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
          ease
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
          ease
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
      ease
    },
    '-=0.4'
  );
};

progress.on('progress', value => {
  document.querySelector('.loader__text').innerHTML = `${value}%`;
  TweenMax.to($progressBar, 0.2, {
    scaleX: value / 100,
    ease: Power4.easeOut
  });
});

progress.on('complete', () => {
  loadingFinished = true;

  if (animationFinished) {
    introAnimation();
  }
});

intro.addEventListener('complete', () => {
  animationFinished = true;

  if (loadingFinished) {
    setTimeout(() => {
      introAnimation();
    }, 800);
  }
});

if (isEdge()) {
  document.querySelector('.loader').style.display = 'none';
}

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
