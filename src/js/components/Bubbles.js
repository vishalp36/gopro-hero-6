class Bubbles {
  constructor(container, translation = -1) {
    this.started = false;
    this.mover = container.querySelector('.bubbles__mover');
    this.wrappers = this.mover.querySelector('.bubbles__wrapper');
    this.translate = 0;
    this.currentTime = 0;
    this.wrapperIndex = 0;
    this.translation = translation;

    this.init();
    this.render();

    setTimeout(() => {
      this.started = true;
    });
  }

  init() {
    const clone = this.wrappers.cloneNode(true);
    this.mover.appendChild(clone);
    this.wrappers = this.mover.querySelectorAll('.bubbles__wrapper');
  }

  render() {
    this.translate += this.translation;
    const gbcr = this.wrappers[1].getBoundingClientRect();

    if (Math.round(gbcr.left) <= 0 && this.started !== false) {
      this.translate = 0;
    }

    this.translateMover();

    requestAnimationFrame(this.render.bind(this));
  }

  translateMover() {
    this.mover.style.transform = `translateX(${this.translate}px)`;
  }
}

export default Bubbles;
