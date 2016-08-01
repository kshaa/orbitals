/*
Init
*/
var scene = new THREE.Scene()
var particles = []
var meshes = [];
var settings = new Settings();

/*
GUI
*/
window.onload = function() {
    var gui = new dat.GUI({ autoPlace: false });
    var container = document.getElementById('gui_container');
    container.appendChild(gui.domElement);
    var tec = gui.addFolder('Particle settings');
        tec.add(settings, 'preset', ['Solar system', 'Binary system', 'Galaxy collapse']).onFinishChange(function(set) {
            if (set = 'Solar system') {settings.presetSettings = SolarPlane();}
            if (set = 'Binary system') {settings.presetSettings = BinaryPlane();}
            console.log(set);
        }).name('Particle presets');
//        tec.add(settings.presetSettings, 'particleCount', 3, 400, 1.0);
    var vis = gui.addFolder('Render settings');
        vis.add(settings, 'colorScale', ['Linear', 'Exponential']).name('Color style');
    var set = gui.addFolder('Simulation settings');
        set.add(settings, 'speed', 0, 5).name('Speed');
        set.add(settings, 'quality', {Low: 1, Medium: 3, High: 5}).name('Quality');
        set.add(settings, 'calculate').name('Calculate');
        set.add(settings, 'restart').name('Restart');
    set.open();
};

/*
Scene
*/
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
scene.fog = new THREE.FogExp2( 0x111115, 0.0128 );
renderer.setClearColor( scene.fog.color, 1 );
document.getElementById("sim_container").appendChild( renderer.domElement );

// Camera
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
camera.position.x = 2.4;
camera.position.z = 5;
camera.rotation.y = Math.PI*0.15;

// Particles
particles = settings.presetSettings.genParticles.call(settings.presetSettings);
var meshes = genMeshes(particles, settings);
for (i = 0; i < settings.presetSettings.particleCount; i++) {
    scene.add(meshes[i]);
}
console.log("1st frame particles: \n", particles, "\n1st frame meshes: \n", meshes);

// Grid for eye easing
var grid = new THREE.GridHelper( 20, 1 );
grid.setColors( 0xabaaaa, 0x444444 );
grid.position.y = -6
scene.add( grid );

// Spotlight
light = new THREE.DirectionalLight( 0xffffff );
light.position.set( 1, 1, 1 );
scene.add( light );

// Global light
light = new THREE.AmbientLight( 0x222222 );
scene.add( light );

/*
Render loop
*/
var framecount = 0;
var render = function () {
    requestAnimationFrame( render );
    if (settings.calculate) {
        particles = particlesOrbit(settings, particles);
        if (framecount < 3) {console.log(framecount, particles[1].position.x);}
        particlesToMeshes(particles, meshes);
    };
    renderer.render(scene, camera);
    if (framecount < 5) {framecount++;}
};

render();
