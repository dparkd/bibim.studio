const {
  WebGLRenderer,
  PerspectiveCamera,
  Scene,
  Mesh,
  MeshBasicMaterial,
  CylinderGeometry,
  AmbientLight,
  PointLight,
  DoubleSide,
  TextureLoader,
  OrbitControls,
  Color,
  PlaneBufferGeometry,
  OrthographicCamera,
  RepeatWrapping
} = THREE;

class App {
  get size() {
    return {
      width: window.innerWidth,
      height: window.innerHeight
    };
  }

  constructor() {
    const { height, width } = this.size;

    this.renderer = new WebGLRenderer({
      antialising: true,
      alpha: true,
      canvas: undefined
    });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);

    this.camera = new PerspectiveCamera(45, width / height, 1, 100);
    this.camera.position.z = 5;

    this.controls = new OrbitControls(this.camera);

    this.scene = new Scene();

    this.backgroundGeometry = new PlaneBufferGeometry(5, 5);
    this.backgroundMap = new TextureLoader().load(
      "https://uploads.codesandbox.io/uploads/user/17b8b653-e409-43ab-bc76-4dc7db446c10/8nUk-rock-_disp.png"
    );
    this.backgroundMap.wrapS = RepeatWrapping;
    this.backgroundMap.wrapT = RepeatWrapping;
    this.backgroundMap.repeat.set(4, 4);
    this.backgroundMaterial = new MeshBasicMaterial({
      color: 0x000000,
      map: this.backgroundMap,
      alphaTest: 0.2
    });
    // this.plane = new Mesh(this.backgroundGeometry, this.backgroundMaterial);

    this.map = new TextureLoader().load("./kinetic_type/logo.png");

    //this.map.wrapS = RepeatWrapping;
    //this.map.wrapT = RepeatWrapping;
    //this.map.repeat.y = 71 / 2048;
    // this.map.repeat.y = 71 / 2048;
    this.map.offset.y = 1 - this.map.repeat.y;
    //this.map.repeat.y = 71 / 2048;
    //this.map.offset.y = 0;
    //this.map.offset.y = 1

    this.geometry = new CylinderGeometry(1, 1, 1, 64, 1, true);
    this.material = new MeshBasicMaterial({
      map: this.map,
      side: DoubleSide,
      alphaTest: 0.7
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.position.z = 1;
    this.mesh.rotation.x = 0.4;
    this.mesh.rotation.z = 0.2;
    this.mesh.rotation.y = -0.8;

    this.scene.add(this.plane);
    this.scene.add(this.mesh);

    document.getElementById("app").appendChild(this.renderer.domElement);
    this.update = this.update.bind(this);
  }

  update() {
    //this.mesh.rotation.x += Math.sin(0.01);
    this.mesh.rotation.y -= Math.sin(0.01);
    this.backgroundMap.offset.y += Math.sin(0.01);
    //this.map.offset.y += 1 - Math.sin(0.01);;

    this.renderer.render(this.scene, this.camera);
    this.requestId = requestAnimationFrame(this.update);
  }
}

const app = new App();
app.update();
