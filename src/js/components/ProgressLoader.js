class ProgressLoader {
  constructor() {
    this.eventsList = ['progress', 'complete'];
    this.progressEvents = [];
    this.completeEvents = [];
    this.globalProgress = 0;
    this.performanceData = window.performance.timing;
    this.estimatedTime = -(
      this.performanceData.loadEventEnd - this.performanceData.navigationStart
    );
    this.convertedEstimatedTime =
      parseInt((this.estimatedTime / 1000) % 60) * 100;
    this.updateRequestProgress();
  }

  updateRequestProgress() {
    this.globalProgress += 1;

    if (this.globalProgress === 100) {
      this.callProgressEvents();
      this.callCompleteEvents();
    } else {
      requestAnimationFrame(this.updateRequestProgress.bind(this));
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
