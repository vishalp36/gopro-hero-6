import { TweenMax, Power1 } from 'gsap';
import { map } from './utils';

class ButtonMovement {
  /**
   * ButtonMovement constructor
   * @param container - DOM element where everything happens
   * @param elements - Array of objects describing elements to move
   */
  constructor(container, elements) {
    this.container = container;
    this.containerWidthCenter = Math.round(this.container.offsetWidth / 2);
    this.containerHeightCenter = Math.round(this.container.offsetHeight / 2);
    this.elements = [];

    elements.forEach(element => {
      this.elements.push(
        Object.assign({}, element, {
          width: element.domElement.getBoundingClientRect().width,
          height: element.domElement.getBoundingClientRect().height
        })
      );
    });

    container.addEventListener('resize', () => {
      this.containerWidthCenter = Math.round(this.container.offsetWidth / 2);
      this.containerHeightCenter = Math.round(this.container.offsetHeight / 2);
    });

    container.addEventListener('mousemove', event => {
      this.onMouseMove(event);
    });
  }

  /**
   * onMouseMove()
   * Update each element position according
   * to mouse position
   * @param event - Mousemove event
   */
  onMouseMove(event) {
    const x = -this.containerWidthCenter + event.clientX;
    const y = this.containerHeightCenter - event.clientY;

    const mappedX = Math.round(map(x, 0, this.containerWidthCenter, 0, 6));
    const mappedY = Math.round(map(y, 0, this.containerHeightCenter, 0, 6));

    this.elements.forEach(element => {
      TweenMax.to(element.domElement, 1, {
        x: mappedX * element.scale,
        y: -mappedY * element.scale,
        z: 30,
        rotationY: Math.round(mappedY * 0.8),
        rotationX: Math.round(mappedX * 0.8),
        ease: Power1.easeOut
      });
    });
  }
}

export default ButtonMovement;
