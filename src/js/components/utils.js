import { TweenLite } from 'gsap';
import * as CustomEase from './CustomEase';

const map = (value, istart, istop, ostart, ostop) =>
  ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

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
