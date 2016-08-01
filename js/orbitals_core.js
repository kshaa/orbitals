/*
Calculate next orbit position
*/
var Particle = function (mass, position, velocity, acceleration, force) {
    this.mass = mass || 0;
    this.position = position || new THREE.Vector3(0,0,0);
    this.velocity = velocity || new THREE.Vector3(0,0,0);
    this.acceleration = acceleration || new THREE.Vector3(0,0,0);
    this.force = force || new THREE.Vector3(0,0,0);
};

Particle.prototype = {

    constructor: Particle,

    orbParticlesForce: function (settings, particles) {
        var force = new THREE.Vector3(), forces = [], gravity = settings.presetSettings.gravity;
        var m1 = this.mass
        var p1 = this.position.clone();
        for (i = 0; i < particles.length; i++) {
            var m2 = particles[i].mass
            var p2 = particles[i].position.clone();

            var radiusVector = p2.sub(p1); // Vector from this to that.
            var radiusScalar = radiusVector.length();
            var forceScalar = (m1 * m2 * gravity) / Math.pow(radiusScalar, 2);
            forces[i] = radiusVector.clone().setLength(forceScalar);
        }
        for (i = 0; i < particles.length; i++) {
            force = force.add(forces[i]);
        }
        this.force = force;
    },

    orbPointForce: function (settings, point, mass) {
        var gravity = settings.gravity;
        var m1 = this.mass, p1 = this.position;
        var m2 = mass,      p2 = point;

        var radius = p1.sub(p2).length();
        var force = (m1 * m2 * gravity) / (radius * radius);
        this.force = p1.clone().setLength(force).negate();
    },

    orbAcceleration: function () {
        var m = this.mass, a = this.acceleration, f = this.force;
        this.acceleration = f.multiplyScalar(1/m);
        return this;
    },

    orbVelocity: function (settings) {
        var a = this.acceleration, v = this.velocity;
        this.velocity = v.add(a);
        return this;
    },

    orbPosition: function () {
        var p = this.position, v = this.velocity;
        this.position = p.add(v);
        return this;
    },

    orbitParticles: function (settings, particles) {
        for (i = 0; i < settings.speed; i++) {
            this.orbParticlesForce(settings, particles);
            this.orbAcceleration();
            this.orbVelocity(settings);
            this.orbPosition();
        }
        return this;
    }
};

// Mass dependant color/size.
function genMeshes(particles, settings, scene) {
    var meshes = [], maxMass = 0;
    // Find max mass (for color coding)
    for (i = 0; i < particles.length; i++) {
        if (particles[i].mass > maxMass) {
            maxMass = particles[i].mass
        };
    };
    for (i = 0; i < particles.length; i++) {
        mass = particles[i].mass;
        if (settings.colorScale = 'Linear') {
            massIndex = mass / maxMass;
        } else if (settings.colorScale = 'Exponential') {
            massIndex = Math.log10(mass) / Math.log10(maxMass);
        } else {
        };
        size = 0.05 + massIndex/15
        meshG = new THREE.BoxGeometry(size, size, size);
        meshC = new THREE.Color(0.9, 1-massIndex, 1-massIndex);
        meshM = new THREE.MeshPhongMaterial({color: meshC, shading: THREE.FlatShading});
        mesh = new THREE.Mesh(meshG, meshM);
        mesh.rotation.x = Math.random()*6;
        mesh.rotation.y = Math.random()*6;
        mesh.rotation.z = Math.random()*6;
        mesh.position.copy(particles[i].position);
        meshes.push(mesh);
    };
    return meshes;
};

function particlesOrbit (settings, particles) {
    newParticles = [];
    for (var i = 0; i < particles.length; i++) {
        oldParticles = particles.slice();
        oldParticles.splice(i,1);

        newParticles[i] = particles[i];
        newParticles[i].orbitParticles(settings, oldParticles);
    }
    return newParticles;
};

function particlesToMeshes (particles, meshArr) {
    for (i = 0; i < particles.length; i++) {
        meshArr[i].position.copy(particles[i].position);
    }
};
