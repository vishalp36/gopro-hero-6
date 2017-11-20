import EarthGlobe from '../components/EarthGlobe';

const globe = new EarthGlobe(
  document.querySelector('.join-community__globe'),
  window
);

globe.addMarker('coucou', 48.866667, 2.333333);
globe.addMarker('test', 50.866667, 2.333333);
