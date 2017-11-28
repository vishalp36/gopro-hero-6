import { TweenLite } from 'gsap';
import * as CustomEase from './CustomEase';

/**
 * Map a value from an interval to another
 * @param {number} value - Current value to map
 * @param {number} istart - Minimum of the initial interval
 * @param {number} istop - Maximum of the initial interval
 * @param {number} ostart - Minimum of the final interval
 * @param {number} ostop - Maximum of the final interval
 */
const map = (value, istart, istop, ostart, ostop) =>
  ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

/**
 * Reveal an element where it is in the viewport
 * @param element - DOM element to observe
 * @param callback - Function to call when the element is visible
 */
const intersectionObserver = (element, callback) => {
  const observer = new IntersectionObserver(
    observables => {
      observables.forEach(observable => {
        if (observable.intersectionRatio <= 0.5) return;
        callback();
        observer.disconnect();
      });
    },
    {
      threshold: [0.5]
    }
  );

  observer.observe(element);
};

const isMobile = () => {
  return new RegExp(
    '/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/'
  ).test(navigator.userAgent);
};

const ease = CustomEase.create('custom', 'M0,0 C0.82,0 0.188,0.93 1,1');

export { map, intersectionObserver, isMobile, ease };
