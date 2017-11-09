import TextRevelation from './components/TextRevelation';

const $title = new TextRevelation(document.querySelector('.capture__title'));
setTimeout(() => {
  $title.reveal();
}, 2000);
