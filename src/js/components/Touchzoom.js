import { TweenMax, Power1 } from 'gsap';
import Hammer from 'hammerjs';
import { map, ease } from './utils';

class Touchzoom {
  /**
   * Touchzoom constructor
   * @param container - DOM element where everything happens
   * @param source - Visual DOM element
   * @param pointer - DOM element used to zoom
   * @param controls - DOM element containing the control bar
   */
  constructor(container, source, pointer, controls) {
    this.container = container;
    this.source = source;
    this.pointer = pointer;
    this.controls = controls;

    this.sourceWidth = Math.round(this.source.offsetWidth);
    this.sourceHeight = Math.round(this.source.offsetHeight);
    this.containerWidthCenter = Math.round(this.container.offsetWidth / 2);
    this.containerHeightCenter = Math.round(this.container.offsetHeight / 2);

    this.manager = new Hammer.Manager(this.pointer);
    this.manager.add(new Hammer.Pan());
    this.moved = 0;

    document.addEventListener('resize', () => {
      this.containerWidthCenter = Math.round(this.container.offsetWidth / 2);
      this.containerHeightCenter = Math.round(this.container.offsetHeight / 2);

      this.sourceWidth = Math.round(this.source.offsetWidth);
      this.sourceHeight = Math.round(this.source.offsetHeight);
    });

    this.container.addEventListener('mousemove', event => {
      const x = -this.containerWidthCenter + event.clientX;
      const y = this.containerHeightCenter - event.clientY;

      const mappedX = Math.round(map(x, 0, this.containerWidthCenter, 0, 6));
      const mappedY = Math.round(map(y, 0, this.containerHeightCenter, 0, 6));

      TweenMax.to(this.source, 1, {
        x: -mappedX,
        y: mappedY,
        z: 30,
        rotationY: Math.round(mappedY * 0.2),
        rotationX: Math.round(mappedX * 0.2),
        ease: Power1.easeOut
      });
    });

    if (window.DeviceOrientationEvent) {
      window.addEventListener(
        'deviceorientation',
        event => {
          const mappedX = Math.round(15 - map(event.alpha, -180, 180, 0, 30));
          const mappedY = Math.round(map(event.beta, -180, 180, 0, 30));

          TweenMax.to(this.source, 1, {
            x: -mappedX,
            y: mappedY,
            z: 30,
            rotationY: Math.round(mappedY * 0.2),
            rotationX: Math.round(mappedX * 0.2),
            ease: Power1.easeOut
          });
        },
        false
      );
    }

    this.manager.on('panstart', event => {
      const gbcr = this.pointer.getBoundingClientRect();

      this.pointer.classList.add('active');

      TweenMax.to(this.pointer, 0.5, {
        y: this.moved + event.deltaY,
        ease: Power1.easeOut
      });
    });

    this.manager.on('panmove', event => {
      if (
        event.center.y >= this.controls.getBoundingClientRect().y - 20 &&
        event.center.y <=
          this.controls.getBoundingClientRect().y +
            this.controls.getBoundingClientRect().height +
            30
      ) {
        TweenMax.to(this.pointer, 0.5, {
          y: this.moved + event.deltaY,
          ease: Power1.easeOut
        });

        const zoom = map(
          event.center.y,
          this.controls.getBoundingClientRect().bottom,
          this.controls.getBoundingClientRect().top,
          0,
          0.2
        );

        TweenMax.to(this.source, 1, {
          scale: 1 + zoom,
          ease: Power1.easeOut
        });
      }
    });

    this.manager.on('panend', event => {
      TweenMax.to(this.pointer, 0.5, {
        y: this.moved + event.deltaY,
        ease
      });

      this.pointer.classList.remove('active');

      if (
        this.moved + event.deltaY <=
        -this.controls.getBoundingClientRect().height + 60
      ) {
        TweenMax.to(this.pointer, 0.5, {
          y: -this.controls.getBoundingClientRect().height + 20,
          ease
        });

        this.moved = -this.controls.getBoundingClientRect().height + 20;

        const zoom = map(
          this.controls.getBoundingClientRect().top,
          this.controls.getBoundingClientRect().bottom,
          this.controls.getBoundingClientRect().top,
          0,
          0.2
        );

        TweenMax.to(this.source, 1, {
          scale: 1 + zoom,
          ease
        });
      } else {
        TweenMax.to(this.pointer, 0.5, {
          y: 0,
          ease
        });

        const zoom = map(
          this.controls.getBoundingClientRect().bottom,
          this.controls.getBoundingClientRect().bottom,
          this.controls.getBoundingClientRect().top,
          0,
          0.2
        );

        TweenMax.to(this.source, 1, {
          scale: 1 + zoom,
          ease
        });

        this.moved = 0;
      }
    });
  }
}

export default Touchzoom;
