class VideoPlayer {
  /**
   * VideoPlayer constructor
   * @param container - DOM element where everything happens
   * @param button - DOM element to play/pause
   * @param timer - DOM element with currentTime
   * @param source - Video DOM element
   */
  constructor(container, button, timer, source) {
    this.container = container;
    this.button = button;
    this.timer = timer;
    this.source = source;

    this.container.classList.add('paused');
    this.initListeners();
  }

  /**
   * init()
   * Play the video on init
   */
  init() {
    this.togglePlay();
  }

  /**
   * togglePlay()
   * Play or pause according
   * to the current state
   */
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

  /**
   * getFullTime()
   * Get the formatted version of video duration
   */
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

  /**
   * getCurrentTime()
   * Get the formatted version of video currentTime
   */
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

  /**
   * updateTimer()
   * Get formatted currentTime + fullTime
   */
  updateTimer() {
    return `${this.getCurrentTime()}/${this.getFullTime()}`;
  }

  /**
   * initListeners()
   */
  initListeners() {
    this.source.addEventListener('loadedmetadata', () => {
      this.timer.innerText = this.updateTimer();

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
