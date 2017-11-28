class EarthGlobeElements {
  /**
   * EarthGlobeElements constructor
   * @param earth - EarthGlobe instance
   * @param elementsContainer - DOM element where all elements are
   */
  constructor(earth, elementsContainer) {
    this.earth = earth;
    this.elementsContainer = elementsContainer;
    this.elements = [];
  }

  /**
   * addElement()
   * @param element - Element linked to a 3D marker
   */
  addElement({ $marker: marker, json: element }) {
    this.elements.push(element);
    const $marker = document.createElement('a');
    $marker.setAttribute('href', element.link);
    $marker.setAttribute('target', '_blank');
    $marker.classList.add('join-community__element');
    $marker.innerHTML = `
      <div class="join-community__element-left">
        <div class="join-community__element-date">
          <span class="join-community__element-month">${
            element.date.month
          }</span>
          <span class="join-community__element-day">${element.date.day}</span>
        </div>
      </div>
      <div class="join-community__element-right">
        <span class="join-community__element-name">${element.name}</span>
        <span class="join-community__element-location">${
          element.location
        }</span>
      </div>
    `;

    $marker.addEventListener('mouseenter', () => {
      this.earth.$target.x = element.position.x;
      this.earth.$target.y = element.position.y;
      marker.classList.add('active');
    });

    $marker.addEventListener('mouseleave', () => {
      marker.classList.remove('active');
    });

    this.elementsContainer.appendChild($marker);
  }
}

export default EarthGlobeElements;
