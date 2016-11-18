var scene, renderer, timer;
var camera, planets;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs").appendChild(renderer.domElement);

    //

    timer = new Timer();

    gui.init();

    window.addEventListener('resize', onWindowResize, false);

    //

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 25;

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.7;
    controls.enableZoom = true;
    controls.enableKeys = false;

    scene = new THREE.Scene();

    var grid = new THREE.GridHelper(20, 10, 0xabaaaa, 0x444444);
    grid.position.y = -6
    scene.add(grid);

    var light = new THREE.AmbientLight(0x222222);
    scene.add(light);

    check.path(settings.path.current);    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
    requestAnimationFrame(animate);
    timer.update();

    renderer.render(scene, camera);
}