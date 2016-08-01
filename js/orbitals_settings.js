var Settings = function() {
    // Simulation settings
    this.speed = 1; // (Integer) How many times faster should the simulation go.
    this.quality = 3; // (Integer) Higher number equals more precise, but slower simulation.
    this.calculate = true;
    this.restart = function() {
        particles.length = 0
        for (i = 0; i < 10000; i++) {
            scene.remove(meshes[i]);
        };
        particles = this.presetSettings.genParticles.call(this.presetSettings);
        meshes = genMeshes(particles, this);
        for (i = 0; i < this.presetSettings.particleCount; i++) {
            scene.add(meshes[i]);
        }
    };
    // Particle settings
    this.preset = "Binary system";
    //this.presetSettings = new BinaryPlane();
    this.presetSettings = new SolarPlane();
    // Render settings
    this.colorScale = 'Linear';
    // Silent settings
    this.cameraRadius = 5;
    this.cameraRotation = THREE.Vector3(0,0,0);
};

var SolarPlane = function() {
    this.gravity = 6.67 * Math.pow(10,-11);
    this.centerMass = Math.pow(3.0,13);
    this.particleCount = 250;
    this.particleMass = Math.pow(3,6);
    this.particleMassRnd = Math.pow(3,1);
    this.particlePos = new THREE.Vector3(0,0,0);
    this.particlePosRnd = new THREE.Vector3(1.0,1.0,0);
    this.particleVel = 0.014;
    this.genParticles = function() {
        function rndVec() {
            return new THREE.Vector3(Math.random()*2-1, Math.random()*2-1, Math.random()*2-1);
        }
        var particles = [];
        for (i = 0; i < (this.particleCount); i++) {
            if (i == 0) {
                var mass = this.centerMass;
                var position = new THREE.Vector3(0,0,0);
                var velocity = new THREE.Vector3(0,0,0);
            } else {
                var mass = this.particleMass + this.particleMassRnd * Math.random();
                var position = this.particlePos.clone().add(this.particlePosRnd.clone().multiply(new rndVec()));
                position.setLength(0.5+(Math.random()*2-1)/8);
                var velocityEuler = new THREE.Euler(0,0,(3.1415/2),'XYZ'); // Orbits anti-clockwise
                var velocity = position.clone().applyEuler(velocityEuler).setLength(this.particleVel);
            };
            var acceleration = new THREE.Vector3(0,0,0);
            var force = new THREE.Vector3(0,0,0);
            var particle = new Particle(mass, position, velocity, acceleration, force);
            particles[i] = clone(particle);
        }
        return particles;
    };
}

var BinaryPlane = function() {
    this.particleCount = 100;
    this.genParticles = function() {
        var sol = new SolarPlane();
        var particles = sol.genParticles();
        console.log("Here: ", particles[1].position.x);
        return particles;
        /*
        sol.particleCount = this.particleCount/2;
        // Generate first solar system
        sol1 = sol.genParticles.call(sol);
        sol1c = new THREE.Vector3(2.5,2.5,0);
        for (i = 0; i < (sol.particleCount); i++)
        {
        sol1[i].position.add(sol1c);
        }
        // Generate second solar system
        sol2 = sol.genParticles.call(sol);
        sol2c = new THREE.Vector3(-2.5,-2.5,0);
        for (i = 0; i < (sol.particleCount); i++)
        {
        sol2[i].position.add(sol2c);
        }
        particles = sol1.concat(sol2);
        return particles;*/
    }
}
