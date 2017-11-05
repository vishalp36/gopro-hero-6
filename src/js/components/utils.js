import 'intersection-observer';

const map = (value, istart, istop, ostart, ostop) =>
  ostart + (ostop - ostart) * ((value - istart) / (istop - istart));

const intersectionObserver = (element, callback) => {
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.intersectionRatio < 1) return;
      callback();
      observer.disconnect();
    },
    {
      threshold: 1
    }
  );

  observer.observe(element);
};

export { map, intersectionObserver };
