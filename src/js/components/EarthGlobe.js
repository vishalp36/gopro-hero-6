import Hammer from 'hammerjs';

class EarthGlobe {
  /**
   * EarthGlobe constructor
   * @param container - DOM element where everything happens
   * @param window - Global window object
   */
  constructor(container, window) {
    this.container = container;
    this.window = window;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.RAD = Math.PI / 180;
    this.PI_HALF = Math.PI / 2;
    this.BREAKPOINT = 800;
    this.responsive = {
      small: {
        distance: 200
      },
      large: {
        distance: 160
      }
    };
    this.$distance = this.responsive.large.distance;
    this.$distanceTarget = this.responsive.large.distance;
    this.$mouse = { x: 0, y: 0 };
    this.$mouseOnDown = { x: 0, y: 0 };
    this.$rotation = { x: 0, y: 0 };
    this.$target = { x: Math.PI * 1 / 2, y: Math.PI / 6.0 };
    this.$targetOnDown = { x: 0, y: 0 };
    this.markers = [];

    // Update distance if screen is too small
    if (this.width <= this.BREAKPOINT) {
      this.$distance = this.responsive.small.distance;
      this.$distanceTarget = this.responsive.small.distance;
      this.height = window.innerHeight * 0.7;
    }

    this.manager = new Hammer.Manager(this.container);
    this.manager.add(new Hammer.Pan());

    this.addEvents();

    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.scene = new THREE.Scene();
    this.obj = new THREE.Object3D();

    this.renderer = new THREE.WebGLRenderer({
      alpha: true
    });
    this.renderer.setSize(this.width, this.height);

    this.container.appendChild(this.renderer.domElement);

    this.camera = new THREE.PerspectiveCamera(
      45,
      this.width / this.height,
      1,
      1000
    );
    this.camera.position.set(0, 0, this.$distance);

    // Load textures
    const earthTexture = new THREE.TextureLoader().load('assets/img/earth.jpg');
    const earthGeometry = new THREE.SphereGeometry(50, 32, 32);
    const earthMaterial = new THREE.MeshPhongMaterial({ map: earthTexture });
    const earthBumpTexture = new THREE.TextureLoader().load(
      'assets/img/earthbump1k.jpg'
    );
    earthMaterial.bumpMap = earthBumpTexture;
    earthMaterial.bumpScale = 0.05;

    this.earth = new THREE.Mesh(earthGeometry, earthMaterial);

    this.obj.add(this.earth);
    this.scene.add(this.obj);

    this.addLights();
    this.loop();
  }

  /**
   * onPanStart()
   * Update target and mouseDown values
   * according to the event
   * @param event - PanStart event
   */
  onPanStart(event) {
    this.$mouseOnDown.x = event.deltaX;
    this.$mouseOnDown.y = event.deltaY;

    this.$targetOnDown.x = this.$target.x;
    this.$targetOnDown.y = this.$target.y;
  }

  /**
   * onPanMove()
   * Update target and mouseDown values
   * according to the event while moving
   * @param event - PanMove event
   */
  onPanMove(event) {
    this.$mouse.x = -event.deltaX;
    this.$mouse.y = event.deltaY;

    const zoomDamp = this.$distance / 1000;

    this.$target.x =
      this.$targetOnDown.x +
      (this.$mouse.x - this.$mouseOnDown.x) * 0.01 * zoomDamp;
    this.$target.y =
      this.$targetOnDown.y +
      (this.$mouse.y - this.$mouseOnDown.y) * 0.01 * zoomDamp;

    this.$target.y =
      this.$target.y > this.PI_HALF ? this.PI_HALF : this.$target.y;
    this.$target.y =
      this.$target.y < -this.PI_HALF ? -this.PI_HALF : this.$target.y;
  }

  /**
   * addEvents()
   * Register all touch and resize events
   */
  addEvents() {
    this.manager.on('panstart', event => {
      this.onPanStart(event);
    });

    this.manager.on('panmove', event => {
      this.onPanMove(event);
    });

    this.window.addEventListener('resize', () => {
      this.width = this.window.innerWidth;
      this.height = this.window.innerHeight;

      this.camera.aspect = this.width / this.height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.width, this.height);

      if (this.width <= this.BREAKPOINT) {
        this.$distance = this.responsive.small.distance;
        this.$distanceTarget = this.responsive.small.distance;
        this.height = window.innerHeight * 0.7;
      } else {
        this.$distance = this.responsive.large.distance;
        this.$distanceTarget = this.responsive.large.distance;
        this.height = window.innerHeight;
      }
    });
  }

  /**
   * addLights()
   * Add Three.js lights to the scene
   */
  addLights() {
    this.ambientLight = new THREE.AmbientLight(0x404040);
    this.scene.add(this.ambientLight);

    this.directionalLight = new THREE.DirectionalLight(0x113c54);
    this.directionalLight.position.set(0, 85, 0);
    this.scene.add(this.directionalLight);

    this.light = new THREE.DirectionalLight(0x444444, 3.5, 500);
    this.scene.add(this.light);
  }

  /**
   * loop()
   * Method every frame to update camera
   * position and rotation according to target
   */
  loop() {
    requestAnimationFrame(this.loop.bind(this));

    this.$rotation.x += (this.$target.x - this.$rotation.x) * 0.1;
    this.$rotation.y += (this.$target.y - this.$rotation.y) * 0.1;
    this.$distance += (this.$distanceTarget - this.$distance) * 0.3;

    this.camera.position.x =
      this.$distance * Math.sin(this.$rotation.x) * Math.cos(this.$rotation.y);
    this.camera.position.y = this.$distance * Math.sin(this.$rotation.y);
    this.camera.position.z =
      this.$distance * Math.cos(this.$rotation.x) * Math.cos(this.$rotation.y);

    this.camera.lookAt(this.obj.position);

    this.renderer.clear();
    this.renderer.render(this.scene, this.camera);

    this.markers.forEach(marker => {
      this.updateMarker(marker);
    });
  }

  /**
   * toScreenPosition()
   * Method every frame to update camera
   * position and rotation according to target
   * @param obj - Three.js mesh to analyse
   * @param camera - Three.js camera
   */
  toScreenPosition(obj, camera) {
    const vector = new THREE.Vector3();

    const widthHalf = 0.5 * this.renderer.context.canvas.width;
    const heightHalf = 0.5 * this.renderer.context.canvas.height;

    obj.updateMatrixWorld();
    vector.setFromMatrixPosition(obj.matrixWorld);
    vector.project(camera);

    vector.x = vector.x * widthHalf + widthHalf;
    vector.y = -(vector.y * heightHalf) + heightHalf;

    return {
      x: Math.round(vector.x),
      y: Math.round(vector.y)
    };
  }

  /**
   * addMarker()
   * Add a marker to the Three.js scene
   * @param json - JSON source with all needed data
   */
  addMarker(json) {
    const {
      id: name,
      geo: { lat, lng },
      position: { x: posX, y: posY },
      link
    } = json;

    const pointer = new THREE.Mesh(
      new THREE.CylinderGeometry(0.1, 0, 0.1),
      new THREE.MeshPhongMaterial({ color: 0xcc9900 })
    );
    pointer.position.set(50, 0, 0);
    pointer.quaternion.setFromUnitVectors(
      new THREE.Vector3(0, 1, 0),
      new THREE.Vector3(1, 0, 0)
    );

    const marker = new THREE.Object3D();
    marker.add(pointer);
    this.placeMarker(marker, lat, lng);
    this.obj.add(marker);

    const $marker = document.createElement('a');
    $marker.setAttribute('href', link);
    $marker.setAttribute('target', '_blank');
    $marker.setAttribute('data-name', name);
    $marker.setAttribute('data-lng', lng);
    $marker.setAttribute('data-lat', lat);
    $marker.classList.add('join-community__marker');
    $marker.innerHTML = `
      <div class="join-community__marker-content">
        <div class="join-community__marker-circle"></div>
        <div class="join-community__marker-dots"></div>
      </div>
    `;
    this.container.appendChild($marker);

    const data = {
      json,
      marker,
      pointer,
      $marker
    };

    this.markers.push(data);

    return data;
  }

  /**
   * updateMarker()
   * Move the attached DOM element and hide it
   * if the 3D marker is hidden
   * @param marker - Marker to analyse
   */
  updateMarker(marker) {
    const screenPosition = this.toScreenPosition(marker.pointer, this.camera);
    marker.$marker.style.transform = `translate(${Math.floor(
      screenPosition.x
    )}px, ${Math.floor(screenPosition.y)}px) rotate(45deg)`;

    const meshPosition = marker.pointer.getWorldPosition();
    const eye = this.camera.position.clone().sub(meshPosition);
    const dot = eye
      .clone()
      .normalize()
      .dot(meshPosition.normalize());

    const ocluded = dot < -0.2;

    if (ocluded) {
      marker.$marker.classList.add('hidden');
    } else {
      marker.$marker.classList.remove('hidden');
    }
  }

  /**
   * placeMarker()
   * @param marker - Object3D to position
   * @param {number} lat - Marker latitude
   * @param {number} long - Marker longitude
   */
  placeMarker(marker, lat, long) {
    marker.quaternion.setFromEuler(
      new THREE.Euler(0, long * this.RAD, lat * this.RAD, 'YZX')
    );
  }
}

export default EarthGlobe;
