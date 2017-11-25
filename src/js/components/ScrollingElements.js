import { TweenMax, Power4 } from 'gsap';
import { ease } from './utils';

class ScrollingElements {
  constructor(container, elements) {
    this.container = container;
    this.elements = elements;
    this.currentPourcentage = 0;
    this.currentIndex = null;
    this.previousIndex = null;
    this.onScrollEvent = this.onScroll.bind(this);

    this.initElements();

    const observer = new IntersectionObserver(
      observables => {
        observables.forEach(observable => {
          if (observable.intersectionRatio >= 0) {
            window.addEventListener('scroll', this.onScrollEvent, false);
          } else {
            window.removeEventListener('scroll', this.onScrollEvent, false);
          }
        });
      },
      {
        threshold: [0]
      }
    );

    observer.observe(this.container);
  }

  getCurrentElement() {
    let wantedIndex = null;

    this.elements.forEach((element, index) => {
      if (
        element.from <= this.currentPourcentage &&
        element.to > this.currentPourcentage
      ) {
        wantedIndex = index;
      }
    });

    return wantedIndex;
  }

  onScroll() {
    const { top, height } = this.container.getBoundingClientRect();
    const percentage = Math.min(
      Math.max(Math.floor(top / -height * 100), 0),
      100
    );

    if (percentage !== this.currentPourcentage) {
      this.currentPourcentage = percentage;
      this.onPercentageChange();
    }
  }

  onPercentageChange() {
    const wantedCurrentIndex = this.getCurrentElement();

    if (this.currentIndex !== wantedCurrentIndex) {
      this.previousIndex = this.currentIndex;
      this.currentIndex = wantedCurrentIndex;
      this.onIndexChange();
    }
  }

  onIndexChange() {
    if (this.previousIndex !== null) {
      TweenMax.staggerTo(
        this.elements[this.previousIndex].titleParts,
        0.6,
        {
          y: '-110%',
          ease
        },
        0.1
      );

      TweenMax.to(this.elements[this.previousIndex].description, 0.6, {
        y: '-110%',
        ease
      });

      TweenMax.to(this.elements[this.previousIndex].source, 0.4, {
        opacity: 0,
        ease: Power4.easeOut
      });

      this.elements[this.previousIndex].source.pause();
    }

    TweenMax.set(this.elements[this.currentIndex].titleParts, {
      y: '110%'
    });

    TweenMax.set(this.elements[this.currentIndex].description, {
      y: '110%'
    });

    TweenMax.staggerTo(
      this.elements[this.currentIndex].titleParts,
      0.6,
      {
        y: '0%',
        ease
      },
      0.1
    );

    TweenMax.to(this.elements[this.currentIndex].description, 0.6, {
      y: '0%',
      ease
    });

    TweenMax.set(this.elements[this.currentIndex].source, {
      opacity: 1
    });

    this.elements[this.currentIndex].source.currentTime = 0;
    this.elements[this.currentIndex].source.play();
  }

  initElements() {
    this.elements.forEach((element, index) => {
      const title = element.title.innerHTML.split(' ');
      element.title.innerHTML = title
        .map(
          (el, index) =>
            `
            <div class="text-revelation__wrapper">
              <span class="text-revelation__text${
                index === title.length - 1 ? ' text-revelation__text--last' : ''
              }">${el}</span>
            </div>
          `
        )
        .join('');

      element.titleParts = [].slice.call(
        element.title.querySelectorAll('.text-revelation__text')
      );

      if (index !== 0) {
        TweenMax.set(element.source, {
          opacity: 0
        });
      }

      TweenMax.set(element.titleParts, {
        y: '-110%'
      });

      TweenMax.set(element.description, {
        y: '-110%'
      });
    });
  }
}

export default ScrollingElements;
