var scene, renderer, timer;
var camera, planets;

init();
animate();

function init() {
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.getElementById("threejs").appendChild(renderer.domElement);

    //

    timer = new Timer();
    gui.init();
    window.addEventListener('resize', onWindowResize, false);

    //

    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.set(2.3, 2.6, 4.6);
    camera.lookAt(new THREE.Vector3(0,0,0));

    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.7;
    controls.enableZoom = true;
    controls.enableKeys = false;

    scene = new THREE.Scene();

    grid = new THREE.GridHelper(20, 10, 0xabaaaa, 0x444444);
    grid.position.y = -6
    scene.add(grid);

    ambientlight = new THREE.AmbientLight(0x111111, 3);
    ambientlight.position.set(1,2,3);
    scene.add(ambientlight);

    highlight = new THREE.PointLight( 0xff0040, 2, 50 );
    highlight.position.set(3,2,1);
    scene.add(highlight);

    // 

    check.path(settings.path.current.value);    
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate () {
    requestAnimationFrame(animate);
    controls.update();
    timer.update();

    if (!settings.simulation.pause) {
        mechanics.update.physics.all();
        mechanics.update.render.all();
    }

    renderer.render(scene, camera);
}
