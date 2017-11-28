import axios from 'axios';

class ProgressLoader {
  /**
   * ProgressLoader constructor
   */
  constructor() {
    this.srcElements = [].slice.call(
      document.querySelectorAll('[data-preload]')
    );
    this.eventsList = ['progress', 'complete'];
    this.progressEvents = [];
    this.completeEvents = [];
    this.globalProgress = 0;
    this.requests = [];
    this.initRequests();
  }

  /**
   * initRequests()
   * Start an AJAX request for every
   * element that need to be loaded
   */
  initRequests() {
    this.srcElements.forEach(element => {
      this.requests.push({
        element,
        type: 'src',
        progress: 0
      });
    });

    this.requests.forEach((request, index) => {
      axios.get(request.element.getAttribute(request.type), {
        onDownloadProgress: e => {
          const progress = Math.floor(e.loaded / e.total * 100);
          this.updateRequestProgress(index, progress);
        }
      });
    });
  }

  /**
   * updateRequestProgress()
   * @param {number} index - Index of the request in the requests array
   * @param {number} progress - Percentage of completion of the request
   */
  updateRequestProgress(index, progress) {
    this.requests[index].progress = progress;
    const total = this.requests.reduce(
      (value, request) => value + request.progress,
      0
    );

    this.globalProgress = Math.floor(total / this.requests.length);

    if (this.globalProgress === 100) {
      this.callProgressEvents();
      this.callCompleteEvents();
    } else {
      this.callProgressEvents();
    }
  }

  /**
   * callProgressEvents()
   * Call every registered progress callbacks
   */
  callProgressEvents() {
    this.progressEvents.forEach(({ callback }) => {
      callback(this.globalProgress);
    });
  }

  /**
   * callCompleteEvents()
   * Call every registered complete callbacks
   */
  callCompleteEvents() {
    this.completeEvents.forEach(({ callback }) => {
      callback();
    });
  }

  /**
   * on()
   * Register an event
   */
  on(event, callback) {
    if (!this.eventsList.includes(event)) {
      throw new Error(`Unknown event ${event} used.`);
    }

    switch (event) {
      case 'progress':
        this.progressEvents.push({ callback });
        break;

      case 'complete':
        this.completeEvents.push({ callback });
        break;

      default:
        break;
    }
  }
}

export default ProgressLoader;
