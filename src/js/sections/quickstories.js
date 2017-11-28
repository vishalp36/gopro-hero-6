import Stickyfill from 'stickyfilljs';
import ScrollingElements from '../components/ScrollingElements';
import { intersectionObserver } from '../components/utils';

const $container = document.querySelector('.quickstories__container');
Stickyfill.addOne($container);

let containerMeta = null;

const updateContainerPosition = () => {
  containerMeta = $container.getBoundingClientRect();
  $container.style.top = `${Math.round(window.innerHeight / 2) -
    Math.round(containerMeta.height / 2)}px`;
};

updateContainerPosition();

window.addEventListener('resize', () => {
  updateContainerPosition();
});

const scrollingElements = new ScrollingElements(
  window,
  document.querySelector('.quickstories'),
  [
    {
      from: 0,
      to: 25,
      source: document.querySelector(
        '.quickstories__source.quickstories__source--1'
      ),
      title: document.querySelector(
        '.quickstories__step--1 .quickstories__step-title'
      ),
      description: document.querySelector(
        '.quickstories__step--1 .quickstories__step-description'
      )
    },
    {
      from: 25,
      to: 50,
      source: document.querySelector(
        '.quickstories__source.quickstories__source--2'
      ),
      title: document.querySelector(
        '.quickstories__step--2 .quickstories__step-title'
      ),
      description: document.querySelector(
        '.quickstories__step--2 .quickstories__step-description'
      )
    },
    {
      from: 50,
      to: 101,
      source: document.querySelector(
        '.quickstories__source.quickstories__source--3'
      ),
      title: document.querySelector(
        '.quickstories__step--3 .quickstories__step-title'
      ),
      description: document.querySelector(
        '.quickstories__step--3 .quickstories__step-description'
      )
    }
  ]
);

intersectionObserver(document.querySelector('.quickstories'), () => {
  updateContainerPosition();
});
