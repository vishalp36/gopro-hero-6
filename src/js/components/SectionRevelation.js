import { TweenMax, TimelineMax } from 'gsap';
import { ease } from './utils';

class SectionRevelation {
  /**
   * SectionRevelation constructor
   * @param container - DOM element where all elements are
   * @param steps - DOM elements to hide to reveal the section
   */
  constructor(container, steps) {
    this.container = container;
    this.timeline = null;
    this.steps = steps;
    this.windows = [];
    this.options = {
      duration: 0.8,
      between: 0.1,
      ease
    };
    this.init();
  }

  /**
   * init()
   * Init all steps
   */
  init() {
    this.steps.forEach(step => {
      let $windowLeft = document.createElement('div');
      $windowLeft.classList.add('section-revelation__window-left');
      $windowLeft.style.backgroundColor = step.color;
      this.container.appendChild($windowLeft);

      let $windowRight = document.createElement('div');
      $windowRight.classList.add('section-revelation__window-right');
      $windowRight.style.backgroundColor = step.color;
      this.container.appendChild($windowRight);

      this.windows.push({
        left: $windowLeft,
        right: $windowRight
      });
    });

    this.windows.reverse();
  }

  /**
   * reveal()
   * Animate all steps
   */
  reveal() {
    this.timeline = new TimelineMax();

    this.windows.forEach((windows, index) => {
      if (index === 0) {
        this.timeline.to(windows.left, this.options.duration, {
          x: '-160%',
          ease: this.options.ease
        });

        this.timeline.to(
          windows.right,
          this.options.duration,
          {
            x: '160%',
            ease: this.options.ease
          },
          `-=${this.options.duration}`
        );
      } else {
        this.timeline.to(
          windows.left,
          this.options.duration,
          {
            x: '-160%',
            ease: this.options.ease
          },
          `-=${this.options.duration - this.options.between}`
        );

        this.timeline.to(
          windows.right,
          this.options.duration,
          {
            x: '160%',
            ease: this.options.ease
          },
          `-=${this.options.duration - this.options.between}`
        );
      }
    });
  }
}

export default SectionRevelation;
