import 'intersection-observer';

const map = (value, istart, istop, ostart, ostop) =>
  ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

const intersectionObserver = (element, callback) => {
  const observer = new IntersectionObserver(
    observables => {
      observables.forEach(observable => {
        if (observable.intersectionRatio >= 0.7) {
          callback();
          observer.disconnect();
        }
      });
    },
    {
      threshold: [0.7]
    }
  );

  observer.observe(element);
};

const isMobile = () => {
  return new RegExp(
    '/Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/'
  ).test(navigator.userAgent);
};

export { map, intersectionObserver, isMobile };
