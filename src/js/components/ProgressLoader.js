import axios from 'axios';

class ProgressLoader {
  constructor() {
    this.srcElements = [].slice.call(document.querySelectorAll('[data-src]'));
    this.backgroundElements = [].slice.call(
      document.querySelectorAll('[data-background]')
    );
    this.eventsList = ['progress', 'complete'];
    this.progressEvents = [];
    this.completeEvents = [];
    this.globalProgress = 0;
    this.requests = [];
    this.initRequests();
  }

  initRequests() {
    this.srcElements.forEach(element => {
      this.requests.push({
        element,
        type: 'data-src',
        progress: 0
      });
    });

    this.backgroundElements.forEach(element => {
      this.requests.push({
        element,
        type: 'data-background',
        progress: 0
      });
    });

    this.requests.forEach((request, index) => {
      axios
        .get(request.element.getAttribute(request.type), {
          onDownloadProgress: e => {
            const progress = Math.floor(e.loaded / e.total * 100);
            this.updateRequestProgress(index, progress);
          }
        })
        .then(() => {
          if (request.type === 'data-background') {
            request.element.style.backgroundImage = `url('${request.element.getAttribute(
              request.type
            )}')`;
            request.element.removeAttribute(request.type);
          } else if (request.type === 'data-src') {
            request.element.src = request.element.getAttribute(request.type);
            request.element.removeAttribute(request.type);
          }
        });
    });
  }

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

  callProgressEvents() {
    this.progressEvents.forEach(({ callback }) => {
      callback(this.globalProgress);
    });
  }

  callCompleteEvents() {
    this.completeEvents.forEach(({ callback }) => {
      callback();
    });
  }

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
