import { TweenMax, TimelineMax } from 'gsap';
import { ease } from './utils';
import TextRevelation from './TextRevelation';

class VoiceControls {
  constructor(container) {
    this.container = container;
    this.illustrations = this.container.querySelectorAll(
      '.voice-controls__part-illustration'
    );
    this.explanations = this.container.querySelectorAll(
      '.voice-controls__part-explanation'
    );
    this.titleParts = this.container.querySelectorAll('.text-revelation__text');
    this.description = this.container.querySelector(
      '.voice-controls__description-wrapper'
    );
    this.button = this.container.querySelector('.voice-controls__button');
    this.buttonContainer = this.container.querySelector(
      '.voice-controls__button-container'
    );
    this.state = false;
    this.opened = false;
    this.parts = [];
    this.buttonAnimation = null;

    this.initListeners();
    this.initExplanations();
  }

  initListeners() {
    this.button.addEventListener('click', () => {
      this.toggleState();
    });
  }

  initExplanations() {
    const explanations = [].slice.call(
      this.container.querySelectorAll('.voice-controls__part-explanation')
    );

    explanations.forEach(explanation => {
      const descriptionWrapper = explanation.querySelector(
        '.voice-controls__part-description-wrapper'
      );

      const titleRevelation = new TextRevelation(
        explanation.querySelector('.voice-controls__part-title'),
        {
          initialDelay: 0.3
        }
      );
      const descriptionRevelation = new TimelineMax();
      descriptionRevelation.set(descriptionWrapper, {
        y: '110%'
      });
      descriptionRevelation.to(descriptionWrapper, 0.6, {
        y: '0%',
        ease,
        delay: 0.4
      });

      this.parts.push({
        title: titleRevelation,
        description: descriptionRevelation
      });
    });
  }

  toggleState() {
    if (this.state === true) {
      this.state = false;
      this.container.classList.remove('opened');
      this.close();
    } else {
      this.state = true;
      this.container.classList.add('opened');
      this.open();
    }
  }

  open() {
    TweenMax.set(this.explanations, {
      x: '-100%'
    });

    const { x, y } = this.destinationPosition();

    this.buttonAnimation = TweenMax.to(this.buttonContainer, 0.7, {
      x,
      y,
      scale: 0.8,
      ease
    });

    TweenMax.staggerTo(
      this.titleParts,
      0.7,
      {
        y: '-110%',
        ease
      },
      0.1
    );

    TweenMax.to(this.description, 0.7, {
      y: '-110%',
      ease
    });

    TweenMax.staggerTo(
      this.illustrations,
      0.7,
      {
        x: '100%',
        ease
      },
      0.1
    );

    TweenMax.staggerTo(
      this.explanations,
      0.7,
      {
        x: '0%',
        ease
      },
      0.1
    );

    this.parts.forEach(part => {
      if (this.opened !== true) {
        part.title.reveal();
        part.description.restart();
      } else {
        part.title.unveil();
        part.description.restart();
      }
    });

    this.opened = true;
  }

  destinationPosition() {
    const { width, height } = this.container.getBoundingClientRect();
    const {
      width: buttonWidth,
      height: buttonHeight,
      left
    } = this.buttonContainer.getBoundingClientRect();
    const top =
      document.querySelector('.voice-controls__content').offsetTop +
      this.buttonContainer.offsetTop -
      buttonHeight;

    const x = Math.round(width / 2) - Math.round(left + buttonWidth / 2);
    const y = Math.round(height / 2) - Math.round(top + buttonHeight / 2);

    return {
      x,
      y
    };
  }

  close() {
    TweenMax.set(this.illustrations, {
      x: '-100%'
    });

    TweenMax.set(this.description, {
      y: '120%'
    });

    TweenMax.set(this.titleParts, {
      y: '120%'
    });

    this.buttonAnimation.reverse();

    TweenMax.to(this.description, 0.7, {
      y: '0%',
      ease
    });

    TweenMax.staggerTo(
      this.titleParts,
      0.7,
      {
        y: '0%',
        ease
      },
      0.1
    );

    TweenMax.staggerTo(
      this.explanations,
      0.7,
      {
        x: '100%',
        ease
      },
      0.1
    );

    TweenMax.staggerTo(
      this.illustrations,
      0.7,
      {
        x: '0%',
        ease
      },
      0.1
    );
  }
}

export default VoiceControls;
