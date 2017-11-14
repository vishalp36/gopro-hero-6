class VideoPlayer {
  constructor(container, button, timer, source) {
    this.container = container;
    this.button = button;
    this.timer = timer;
    this.source = source;

    this.container.classList.add('paused');
    this.initListeners();
  }

  init() {
    this.togglePlay();
  }

  togglePlay() {
    if (this.source.paused) {
      this.source.play();
      this.container.classList.remove('paused');
      this.container.classList.add('running');
    } else {
      this.source.pause();
      this.container.classList.remove('running');
      this.container.classList.add('paused');
    }
  }

  getFullTime() {
    const { duration } = this.source;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
  }

  getCurrentTime() {
    const duration = this.source.currentTime || 0;
    let minutes = Math.floor(duration / 60);
    let seconds = Math.floor(duration - minutes * 60);

    if (seconds < 10) {
      seconds = `0${seconds}`;
    }

    if (minutes < 10) {
      minutes = `0${minutes}`;
    }

    return `${minutes}:${seconds}`;
  }

  updateTimer() {
    return `${this.getCurrentTime()}/${this.getFullTime()}`;
  }

  initListeners() {
    this.source.addEventListener('loadedmetadata', () => {
      this.updateTimer();

      this.source.ontimeupdate = () => {
        const timer = this.updateTimer();

        if (timer !== this.timer.innerText) {
          this.timer.innerText = timer;
        }
      };
    });

    this.button.addEventListener('click', () => {
      this.togglePlay();
    });
  }
}

export default VideoPlayer;
