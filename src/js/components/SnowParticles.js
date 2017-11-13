class SnowParticles {
  constructor() {
    this.step = 0;
    this.camPosX = 0;
    this.camPosZ = 700;
    this.camPosY = 400;
    this.particleCount = 300;

    this.scene = new THREE.Scene();
    this.aspectRatio = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(45, this.aspectRatio, 1, 1500);
    this.renderer = null;

    if (this.webglAvailable()) {
      this.renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    } else {
      this.renderer = new THREE.CanvasRenderer({
        alpha: true,
        antialias: true
      });
    }

    this.renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    this.renderer.shadowMap.enabled = true;

    window.addEventListener('resize', () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight * 0.9);
    });

    document.querySelector('.intro').appendChild(this.renderer.domElement);

    // this.initLights();

    this.camera.position.z = 200;
    this.camera.position.x = this.camPosX;
    this.camera.rotation.y = 130;
    this.camera.rotation.z = 90;
    this.camera.lookAt(new THREE.Vector3(0, 45, 0));

    this.initParticles();

    this.render();
  }

  initLights() {
    this.light = new THREE.AmbientLight(0x0c0c0c);
    this.scene.add(this.light);

    this.shadowLight = new THREE.DirectionalLight(0xffffff, 1);
    this.shadowLight.position.set(500, 1000, 500);
    this.shadowLight.castShadow = true;
    this.shadowLight.shadow.mapSize.width = 1024;
    this.shadowLight.shadow.mapSize.height = 1024;
    this.scene.add(this.shadowLight);
  }

  initParticles() {
    this.pMaterial = new THREE.PointsMaterial({
      color: 0xffffff,
      size: 3,
      blending: THREE.AdditiveBlending,
      depthTest: false,
      sizeAttenuation: true,
      transparent: true
    });

    this.particles = new THREE.Geometry();

    for (let i = 0; i < this.particleCount; i += 1) {
      const pX = Math.random() * 1000 - 500;
      const pY = Math.random() * 500 - 250;
      const pZ = Math.random() * 1000 - 500;

      const particle = new THREE.Vector3(pX, pY, pZ);
      particle.velocity = {};
      particle.velocity.y = -1;
      this.particles.vertices.push(particle);
    }

    this.particleSystem = new THREE.Points(this.particles, this.pMaterial);
    this.particleSystem.position.y = 80;
    this.particleSystem.rotation.x = -20;
    this.scene.add(this.particleSystem);
  }

  webglAvailable() {
    try {
      const canvas = document.createElement('canvas');
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
      );
    } catch (e) {
      return false;
    }
  }

  simulateRain() {
    let pCount = this.particleCount;

    while (pCount--) {
      const particle = this.particles.vertices[pCount];

      if (particle.y < -300) {
        particle.y = 200;
        particle.velocity.y = -1;
      }
      particle.velocity.y -= Math.random() * 0.02;
      particle.y += particle.velocity.y * 0.3;
    }

    this.particles.verticesNeedUpdate = true;
  }

  render() {
    requestAnimationFrame(this.render.bind(this));
    this.renderer.render(this.scene, this.camera);

    this.camera.position.y =
      this.camPosY + Math.sin(this.step / 400 * Math.PI * 4) * 5;
    this.camera.position.x =
      this.camPosX + Math.sin(this.step / 400 * Math.PI * 2) * 10;
    this.camera.lookAt(new THREE.Vector3(0, 45, 200));
    this.camera.rotation.z =
      Math.sin(this.step / 400 * Math.PI * 2) * Math.PI / 200;

    this.simulateRain();

    this.step += 1;
    this.step = this.step % 400;
  }
}

export default SnowParticles;
