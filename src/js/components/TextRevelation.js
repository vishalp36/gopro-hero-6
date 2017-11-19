import { TweenMax, TimelineMax } from 'gsap';
import { ease } from './utils';

class TextRevelation {
  constructor(element, options = this.defaultOptions()) {
    this.element = element;
    this.options = Object.assign({}, this.defaultOptions(), options);
    this.parts = null;
    this.lines = [];
    this.timeline = null;

    this.buildText();
    this.getInfos();
    this.initTimeline();
  }

  defaultOptions() {
    return {
      duration: 0.8,
      between: 0.1,
      initialDelay: 0,
      ease
    };
  }

  buildText() {
    const content = this.element.innerHTML.split(' ');
    this.element.innerHTML = content
      .map(
        (el, index) =>
          `
          <div class="text-revelation__wrapper">
            <span class="text-revelation__text${index === content.length - 1
              ? ' text-revelation__text--last'
              : ''}">${el}</span>
          </div>
        `
      )
      .join('');

    this.parts = [].slice.call(
      this.element.querySelectorAll('.text-revelation__wrapper')
    );
  }

  getInfos() {
    this.parts.forEach(part => {
      const { top } = part.getBoundingClientRect();
      const isInLine = this.isInline(top);

      if (isInLine === false) {
        this.lines.push({
          top,
          parts: [part]
        });
      } else {
        this.lines[isInLine].parts.push(part);
      }
    });
  }

  isInline(top) {
    const matchingLine = this.lines.findIndex(line => line.top === top);
    if (matchingLine === -1) {
      return false;
    }

    return matchingLine;
  }

  initTimeline() {
    this.lines.forEach(line => {
      line.parts.forEach(part => {
        TweenMax.to(part.querySelector('.text-revelation__text'), 0, {
          y: '110%'
        });
      });
    });
  }

  reveal() {
    this.timeline = new TimelineMax();

    this.lines.forEach((line, index) => {
      line.parts.forEach((part, index2) => {
        if (index === 0) {
          if (index2 === 0) {
            this.timeline.to(
              part.querySelector('.text-revelation__text'),
              this.options.duration,
              {
                y: '0%',
                ease: this.options.ease,
                delay: this.options.initialDelay
              }
            );
          } else {
            this.timeline.to(
              part.querySelector('.text-revelation__text'),
              this.options.duration,
              {
                y: '0%',
                ease: this.options.ease
              },
              `-=${this.options.duration}`
            );
          }
        } else {
          if (index2 === 0) {
            this.timeline.to(
              part.querySelector('.text-revelation__text'),
              this.options.duration,
              {
                y: '0%',
                ease: this.options.ease
              },
              `-=${this.options.duration - this.options.between}`
            );
          } else {
            this.timeline.to(
              part.querySelector('.text-revelation__text'),
              this.options.duration,
              {
                y: '0%',
                ease: this.options.ease
              },
              `-=${this.options.duration}`
            );
          }
        }
      });
    });
  }

  unveil() {
    this.timeline.restart();
  }

  veil() {
    this.timeline.reverse();
  }
}

export default TextRevelation;
